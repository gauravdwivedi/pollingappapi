const Option = require('../models/option');
const Question = require('../models/question');

module.exports.createOption = async function (req, res) {
    
    try {

        //first we have to find if the question exists 
        const question = await Question.findById({ _id: req.params.id });

        //if the question exists
        if (question !== undefined) {
            
            //we create the new option with text and question ref in option collection
        
            const option = await Option.create({
                text: req.body.text,
                question: req.params.id
            });

            //create link to vote and save it in option collection
            const linktovote = req.protocol + "://" + req.headers.host + "/options/" + option.id + "/add_vote";
            option.link_to_vote = linktovote;
            await option.save();

            //save option[] inside question
            question.options.push(option);
            await question.save();

            //return response to user 
            return res.status(200).json({
                success: true,
                message: option
            });
        }

            //return response to user if question does not exists
           return res.status(500).json({
            success: false,
            message: err.message
        });
    
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports.add_vote = async function (req, res) {


    try {
        //check if the option exists

        const option = await Option.findById({ _id: req.params.id });

        if (option !== undefined) {
        
            //increase the count of add_vote
            option.votes += 1;
            await option.save();

            return res.status(200).json({
                success: true,
                message: option
            });
        }
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

}


module.exports.deleteOption = async function (req, res) {
    
    try {

        
        //check if option exists 
        const option = await Option.findById({ _id: req.params.id });
        
        if (option !== undefined) {
        
            //check if option has any vote

            if (option.votes <= 0) {

                //find question to delete its option 
                const question = await Question.findById(option.question);
                question.options.pull(option._id);
                await question.save();

                //delete option
                option.remove();

                //return response to user
                return res.status(200).json(
                    {
                        success: true,
                        message:"Option has been deleted successfully"
                    }
                );
            
           
            } else {

                //return response to user
                return res.status(500).json({
                    success: false,
                    message: "Option has votes and cannot be deleted"
                });
            }
        } else {
            //return response to user
            return res.status(500).json({
                success: false,
                message: "Option does not exists"
            });
        }
    }
    catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
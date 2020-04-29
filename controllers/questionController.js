const Question = require('../models/question');
const Option = require('../models/option');


module.exports.createQuestion = async function (req, res) {
    

    try {

        const question = await Question.create({
            title: req.body.title
        });

        return res.status(200).json({
            success: true,
            message: question
        });
        

        
    } catch (err) {
        
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}



module.exports.deleteQuestion = async function (req, res) {
    
    try {

        //find if question exists or not 
        const question = await Question.findById({ _id: req.params.id });

        if (question !== undefined) {
            
            //check if question has options
            const option = await question.options;
            
            for (let i = 0; i < option.length; i++) {
            
                let id = option[i];
                const option2 = await Option.findById({ _id: id });

                 //finding if option has votes
                if (option2.votes > 0) {
                    return res.status(500).json({
                        success:false,
                        message: "Question has option which has votes"
                    });
                    }
            }
           
            
            //delete the question
           question.remove();

            return res.status(200).json({
                success:true,
                message: "Question Deleted Successfully"
            });

        } else {

            //return response to user
            return res.status(500).json({
                message: "Question does not exist in DB"
            });
        }
        
    } catch (err) {
        //return response to user
        return res.status(500).json({
            message: err.message
        });

    }
}

module.exports.getQuestion = async function (req, res) {
    
    try {

        //check if question exists 
        const question = Question.findById({ _id: req.params.id });
        if (question !== undefined) {
            
            //return queston to user
            return res.status(200).json({
                success: true,
                message: question
            });
        }

        //return response to user
        return res.status(500).json({
            success: false,
            message: "Question does not exists in db"
        });
        
    } catch (err) {

        //return response to user
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports.getAllQuestions = async function (req, res) {
    
    try {
        //fetch all questions 
        const questions = await Question.find({});


        //return response to user
        return res.status(200).json({
            success: true,
            questions: questions
        });
        
    } catch (err) {

        //return response to user
        return res.status(500).json({
            message: err.message
        });
    }
}
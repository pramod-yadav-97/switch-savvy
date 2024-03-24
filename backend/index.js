const express = require("express")
const mongoose = require("mongoose");


const app = express();

app.use(express.json());
// Connecting to database server cluster 0
mongoose.connect('mongodb+srv://sandeepgunde123:troN0HsAKjhn5omG@cluster0.ref1enh.mongodb.net/');

// creating a model like this document we have to store in mongo database
const User = mongoose.model("Users",{
    username:String,
    employeename:String,
    role:String,
    password:String
});

const springbootQuestions = mongoose.model("interview_ques_table", {
    language: String,
    level: String,
    question: String,
    answer: String
});


app.post('/addSpringbootQuestion',function(req,res){
    

    const datas = new springbootQuestions({
        language:req.body.language,
        level:req.body.level,
        question:req.body.question,
        answer:req.body.answer
    })

    datas.save().then(
        savedUser =>{
            res.status(201).json({"msg":"Question Added successfully"});
        })
})

app.get('/springboot', async (req, res) => {
    try {
        // Retrieve all documents from the collection
        const documents = await springbootQuestions.find({});
        // Send the documents as JSON response
        res.json(documents);
    } catch (err) {
        console.error('Error retrieving documents:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4000);


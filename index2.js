const express=require('express');
const app=express();
const books=[{id:1,title:"one",author:"ONe"},
   { id:2,title:"two",author:"TWo"}
];
app.use(express.json());
app.get('/books',function(req,res){
    res.json(books);
})

app.get('/books/:id',(req,res)=>{
const id=req.params.id;
if(isNaN(id))
    return res.status(400).json({error:`id must be an number`});
const book=books.find((e)=>e.id==id);

if(!book) 
    return res.status(404).json({error:`book with ${id} does not exists`});



return res.json(book);

});

app.post('/books',(req,res)=>{
    
    const {title,author}=req.body;

    if(!title ||title==='') 
        return res.status(400).json({error:`yeah you have to put title man`});

    if(!author ||author==='') 
        return res.status(400).json({error:`yeah you have to put author man`});

    const id=books.length+1;
    const book={id,title,author};
    books.push(book);

    return res.status(201).json({message:`book has been created`,id});

});

app.delete('/books/:id',(req,res)=>{
    const id=req.params.id;
if(isNaN(id))
    return res.status(400).json({error:`id must be an number`});
const indexToDelete=books.find((e)=>e.id===id)

if(indexToDelete<0)
return  res.status(404).json({error:`Book with ${id} does not exists!`});
books.splice(indexToDelete,1);
return res.json({message:`book has been deleted`});

});




app.listen(8000,(req,res)=>{
    console.log("this server is running on port 8000");
})
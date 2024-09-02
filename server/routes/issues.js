var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

/* 
The REST API server can be anything that can return static JSON - local on your machine or in the cloud. For example: local Node.js, Python or any server running on your machine, a serverless function in the cloud, a container, whatever you’re most comfortable with.

The server should support these 4 standard operations: 
Create: accepts a JSON object & prints/logs the object
Read: returns a static JSON object
Update: accepts a JSON object & prints/logs the object
Delete: prints/logs out the object or id to delete

*/

// GET all issues
router.get('/', async function (req, res, next) {
  try{

    const issues = await req.db.collection('issues').find({}).toArray();
  
    res.json(issues);
  
    } catch(err) {
      next(err);
    }
})

// GET specific issue
router.get('/:issueID',async function(req,res,next) {
  try{
  const issueID = req.params.issueID;


  if (!ObjectId.isValid(issueID)) {
    return res.status(400).json({error: "invalid issue ID"});
  }
  const issue = await req.db.collection('issues').findOne({ _id: new ObjectId(issueID)});

  if (!issue) {
    return res.status(404).json({error: 'Issue not found'})
  }

  res.json(issue);

  } catch(err) {
    next(err);
  }
});

// Create new issue
router.post('/', async (req,res,next) => {
  try {
    const newIssue = {
      title: req.body.title,
      description: req.body.description
    }
    console.log(req.db)

    const result = await req.db.collection('issues').insertOne(newIssue);
    res.status(201).json(result.insertedId);
  } catch (err) {
    next(err);
  }
});


// PUT update an issue by ID
router.put('/:id', async (req, res, next) => {
  try {
      const issueId = req.params.id;

      // Validate the ObjectId format
      if (!ObjectId.isValid(issueId)) {
          return res.status(400).json({ error: 'Invalid issue ID format' });
      }

      const updatedIssue = {
          title: req.body.title,
          description: req.body.description
      };

      const result = await req.db.collection('issues').updateOne(
          { _id: new ObjectId(issueId) },
          { $set: updatedIssue }
      );

      if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Issue not found' });
      }

      res.json({ message: 'Issue updated successfully' });
  } catch (err) {
      next(err);  // Pass errors to the error handler
  }
});

// DELETE an issue by ID
router.delete('/:id', async (req, res, next) => {
  try {
      const issueId = req.params.id;

      // Validate the ObjectId format
      if (!ObjectId.isValid(issueId)) {
          return res.status(400).json({ error: 'Invalid issue ID format' });
      }

      const result = await req.db.collection('issues').deleteOne({ _id: new ObjectId(issueId) });

      if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Issue not found' });
      }

      res.json({ message: 'Issue deleted successfully' });
  } catch (err) {
      next(err);  // Pass errors to the error handler
  }
});

module.exports = router;
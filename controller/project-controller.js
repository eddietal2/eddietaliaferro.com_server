const Project = require('../models/project.model');
exports.getProjectPosts = (req, res) => {
  Project.find((err, projects) => {
    // console.log(projects)
    console.log('Getting Projects...')
    res.json(projects)
  })
}
exports.getProjectInfo = (req, res) => {
  const id = req.body.id;
  console.log(req.body);
  Project.findById(
    id,
    (err, project) => {
      console.log(project)
      console.log('Getting Projects...')
      if(err) return res.status(400).json(err)
      if(!project) return res.status(400).json({msg: 'There was no project with that id'})
      console.log(`Deleting _id ${id}`);
      return res.status(200).json(project)
  })
}
exports.getLatestProjectPosts = (req, res) => {
  Project.find((err, projects) => {
    // console.log(projects)
    // Get the last three projects to be put in the projects collection
    console.log('Getting Latests Projects...')
    console.log(projects.slice(0, 2))
    res.json(projects.slice(0, 3))
  })
}
exports.toggleVisibility = (req, res) => {
  id = req.body.id;
  title = req.body.title;
  visible = req.body.visible;
  console.log('Project "' + title + '" visibility:')
  Project.findById(
    id,
    (err, project) => {
    if(err) {
      console.log(err);
      return err;
    }
    if(!project) {
      console.log('There was no Project with that ID!');
      return res.status(400).json({msg: 'There was no Project with that ID'});
    }
    if(project) {
      // check for visibility property
      // toggle the property
      if(!project.visible) {
        Project.findByIdAndUpdate(
          id,
          {visible: true},
          {new: true},
          (err, project) => {
            if(err) {
              console.log(err);
              return err;
            }
            if(!project) {
              console.log('There was no Project with that ID!');
              return res.status(400).json({msg: 'There was no Project with that ID'});
            }
            if(project) {
              console.log(project.visible);
              console.log('\n');
              return res.status(200).json(visible);
            }
          }
        )
      }
      if(project.visible) {
        Project.findByIdAndUpdate(
          id,
          {visible: false},
          {new: true},
          (err, project) => {
            if(err) {
              console.log(err);
              return err;
            }
            if(!project) {
              console.log('There was no Project with that ID!');
              return res.status(400).json({msg: 'There was no Project with that ID'});
            }
            if(project) {
              console.log(project.visible);
              console.log('\n');
              return res.status(200).json(visible);
            }

          }
        )
      }
    }
  });
}
exports.addProject = (req, res) => {
  console.log(req.body);
  title = req.body.title;
  visible = req.body.visible;
  thumbnail = req.body.thumbnail;
  hashtags = req.body.hashtags.map(tag => ' #' + tag);
  post = req.body.post;
  picture_1 = req.body.picture_1;
  picture_2 = req.body.picture_2;
  picture_3 = req.body.picture_3;
  picture_4 = req.body.picture_4;
  picture_5 = req.body.picture_5;

  if(!title) return res.status(400).json({msg: 'There was either no title in the request'})
  if(!thumbnail) return res.status(400).json({msg: 'There was no thumbnail in the request'})
  if(!post) return res.status(400).json({msg: 'There was either no post in the request'})
  // picture = req.body.picture;

  // made a new Project object and save it

  let newProject = Project({
    title,
    post,
    visible,
    hashtags,
    thumbnail,
    picture_1,
    picture_2,
    picture_3,
    picture_4,
    picture_5,
    date: Date.now()
  })

   newProject.save((err, project) => {
    if(err) return res.status(400).json(err);
    console.log(err);
    if(!project) {
      return res.status(400).json({msg: 'There was no project with that ID, the Project did not save.'})
    }
    if(project) {
      return res.status(200).json(project)
    }
  })
}
exports.deleteProject = (req, res) => {
  // project id
  projectID = req.body.id;
  console.log(req.body);
  console.log(projectID)
  Project.findByIdAndDelete(
    projectID,
    (err, project) => {
      if(err) return res.status(400).json(err)
      if(!project) return res.status(400).json({msg: 'There was no project with that id'})
      console.log(`Deleting _id ${projectID}`);

      Project.find((err, projects) => {
        // console.log(projects)
        console.log('Getting Projects...')
        return res.status(200).json(projects);
      })
    }
  )
}
exports.editProject = (req, res) => {
  console.log(req.body);
  id = req.body.id;
  title = req.body.title;
  visible = req.body.visible;
  thumbnail = req.body.thumbnail;
  hashtags = req.body.hashtags.map(tag => ' #' + tag);
  post = req.body.post;
  picture_1 = req.body.picture_1;
  picture_2 = req.body.picture_2;
  picture_3 = req.body.picture_3;
  picture_4 = req.body.picture_4;
  picture_5 = req.body.picture_5;

  Project.findOneAndUpdate(
    id,
    { $set:
      { 'title': title,
        'thumbnail': thumbnail,
        'hashtags': hashtags,
        'post': post,
        'picture_1': picture_1,
        'picture_2': picture_2,
        'picture_3': picture_3,
        'picture_4': picture_4,
        'picture_5': picture_5,
      }
    },
    { new: true },
    (err, project) => {
      if(err) return res.status(400).json(err)
      if(!project) return res.status(400).json({msg: 'There was no project with that id'})
      console.log(`Editing _id ${id}`)
      if(project) {
        return res.status(200).json({msg: `Edited project with _id ${id}`, project})
      }
    }
  )
}
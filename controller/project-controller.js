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
  description = req.body.description;
  url = req.body.url;
  visible = req.body.visible;
  thumbnail = req.body.thumbnail;

  if(!title) return res.status(400).json({msg: 'There was no title in the request'})
  if(!thumbnail) return res.status(400).json({msg: 'There was no thumbnail in the request'})
  if(!description) return res.status(400).json({msg: 'There was no description in the request'})
  if(!url) return res.status(400).json({msg: 'There was no url in the request'})
  // picture = req.body.picture;

  // made a new Project object and save it

  let newProject = Project({
    title,
    description,
    visible,
    url,
    thumbnail  })

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
  url = req.body.url;
  thumbnail = req.body.thumbnail;
  description = req.body.description;

  Project.findOneAndUpdate(
    id,
    { $set:
      { 'title': title,
        'thumbnail': thumbnail,
        'url': url,
        'description': description,
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
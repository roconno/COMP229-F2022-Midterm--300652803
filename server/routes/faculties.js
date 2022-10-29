// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
  return res.render('faculties/add', {
    title: 'Add faculty'
  });
});

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", async (req, res, next) => {
  
  // Destructuring the req.body to get payload from detail page
  const { Facultyid, Facultyname, Department, Subject } = req.body;

  const createdFaculty = new faculty({
    Facultyid,
    Facultyname,
    Department,
    Subject
  });

  await faculty.create(createdFaculty);

  return res.redirect('/faculties');
});

// GET - process the delete
/**
 * Must define the delete route before {GET} /:id
 * Because "/delete" will be interpreted as "/:id" 
 */
router.get("/delete", async (req, res, next) => {
  const faculName = req.query.name;

  if (!faculName) {
    return res.render('errors/404', {
      title: 'Page not found'
    });
  } else {
    await faculty.deleteOne({
      Facultyname: faculName
    });

    return res.redirect('/faculties');
  }
});

// GET the faculty  Details page in order to edit an existing faculty
router.get("/:id", async(req, res, next) => {
  const facultyId = req.params.id;

  if (!mongoose.isValidObjectId(facultyId)) {
    return res.render('errors/404', {
      title: 'Faculty not found'
    });
  }

  const facultyFromDB = await faculty.findById(facultyId);

  if (!facultyFromDB) {
    return res.render('errors/404', {
      title: 'Faculty not found'
    });
  } else {
    return res.render('faculties/details', {
      title: 'Faculty detail',
      faculties: facultyFromDB
    });
  }
});

// POST - process the information passed from the details form and update the document
router.post("/:id", async(req, res, next) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.render('errors/404', {
      title: 'Faculty not found'
    });
  }
  // Destructuring the req.body to get payload from detail page
  const { Facultyid, Facultyname, Department, Subject } = req.body;
  const updatedFaculty = new faculty({
    _id: id,
  });
  const updatedPayload = {
    Facultyid,
    Facultyname,
    Department,
    Subject
  };

  await faculty.update(updatedFaculty, updatedPayload);

  return res.redirect('/faculties');
});

module.exports = router;

const router = require("express").Router();
const jwt = require("jsonwebtoken");

const {
  Intro,
  About,
  Expreience,
  Project,
  Contact,
} = require("../models/portfolioModel");
const User = require("../models/userModel");

const authMiddleware = require("../middleware/authMiddleware");
const { validateBody, schemas } = require("../middleware/validate");

// Generic error responder — logs details server-side, never leaks them.
const fail = (res, error) => {
  console.error(error);
  res.status(500).send({ success: false, message: "Something went wrong" });
};

// ---------------------------------------------------------------------------
// PUBLIC: read portfolio data
// ---------------------------------------------------------------------------
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const [intros, abouts, expreiences, projects, contacts] = await Promise.all(
      [
        Intro.find(),
        About.find(),
        Expreience.find(),
        Project.find(),
        Contact.find(),
      ]
    );

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      projects,
      contact: contacts[0],
      expreiences,
    });
  } catch (error) {
    fail(res, error);
  }
});

// ---------------------------------------------------------------------------
// PUBLIC: admin login  ->  returns a signed JWT
// ---------------------------------------------------------------------------
router.post("/admin-login", validateBody(schemas.login), async (req, res) => {
  try {
    const { username, password } = req.body;

    // password has select:false on the model, so ask for it explicitly
    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: { _id: user._id, username: user.username },
    });
  } catch (error) {
    fail(res, error);
  }
});

// ---------------------------------------------------------------------------
// PROTECTED: everything below requires a valid JWT
// ---------------------------------------------------------------------------
router.use(authMiddleware);

// update intro
router.post(
  "/update-intro",
  validateBody(schemas.updateIntro),
  async (req, res) => {
    try {
      const intro = await Intro.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res
        .status(200)
        .send({ data: intro, success: true, message: "Intro updated successfully" });
    } catch (error) {
      fail(res, error);
    }
  }
);

// update about
router.post(
  "/update-about",
  validateBody(schemas.updateAbout),
  async (req, res) => {
    try {
      const about = await About.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res
        .status(200)
        .send({ data: about, success: true, message: "About updated successfully" });
    } catch (error) {
      fail(res, error);
    }
  }
);

// add experience
router.post(
  "/add-experience",
  validateBody(schemas.addExperience),
  async (req, res) => {
    try {
      const experience = await Expreience.create(req.body);
      res.status(200).send({
        data: experience,
        success: true,
        message: "Experience added successfully",
      });
    } catch (error) {
      fail(res, error);
    }
  }
);

// update experience
router.post(
  "/update-experience",
  validateBody(schemas.updateExperience),
  async (req, res) => {
    try {
      const experience = await Expreience.findByIdAndUpdate(
        req.body._id,
        req.body,
        { new: true }
      );
      res.status(200).send({
        data: experience,
        success: true,
        message: "Experience updated successfully",
      });
    } catch (error) {
      fail(res, error);
    }
  }
);

// delete experience
router.post(
  "/delete-experience",
  validateBody(schemas.byId),
  async (req, res) => {
    try {
      const experience = await Expreience.findByIdAndDelete(req.body._id);
      res.status(200).send({
        data: experience,
        success: true,
        message: "Experience deleted successfully",
      });
    } catch (error) {
      fail(res, error);
    }
  }
);

// add project
router.post(
  "/add-project",
  validateBody(schemas.addProject),
  async (req, res) => {
    try {
      const project = await Project.create(req.body);
      res.status(200).send({
        data: project,
        success: true,
        message: "Project added successfully",
      });
    } catch (error) {
      fail(res, error);
    }
  }
);

// update project
router.post(
  "/update-project",
  validateBody(schemas.updateProject),
  async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res.status(200).send({
        data: project,
        success: true,
        message: "Project updated successfully",
      });
    } catch (error) {
      fail(res, error);
    }
  }
);

// delete project
router.post(
  "/delete-project",
  validateBody(schemas.byId),
  async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.body._id);
      res.status(200).send({
        data: project,
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      fail(res, error);
    }
  }
);

// update contact
router.post(
  "/update-contact",
  validateBody(schemas.updateContact),
  async (req, res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      res.status(200).send({
        data: contact,
        success: true,
        message: "Contact updated successfully",
      });
    } catch (error) {
      fail(res, error);
    }
  }
);

module.exports = router;

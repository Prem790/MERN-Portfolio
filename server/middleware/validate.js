const { z } = require("zod");

/**
 * Returns middleware that validates req.body against a Zod schema.
 * On failure responds 400 with the specific field errors.
 * On success replaces req.body with the parsed (and stripped) data,
 * which also prevents mass-assignment of unexpected fields.
 */
function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).send({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
    }
    req.body = result.data;
    next();
  };
}

// ---- Reusable field helpers ----
const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid id");
const nonEmpty = (label) => z.string().trim().min(1, `${label} is required`);

// ---- Schemas ----
const schemas = {
  login: z.object({
    username: nonEmpty("Username").max(100),
    password: z.string().min(1, "Password is required").max(200),
  }),

  updateIntro: z.object({
    _id: objectId,
    welcomeText: nonEmpty("Welcome text"),
    firstName: nonEmpty("First name"),
    lastName: nonEmpty("Last name"),
    caption: nonEmpty("Caption"),
    description: nonEmpty("Description"),
  }),

  updateAbout: z.object({
    _id: objectId,
    lottieURL: nonEmpty("Lottie URL"),
    description1: nonEmpty("Description 1"),
    description2: nonEmpty("Description 2"),
    skills: z.array(z.string()).default([]),
  }),

  addExperience: z.object({
    title: nonEmpty("Title"),
    period: nonEmpty("Period"),
    company: nonEmpty("Company"),
    description: nonEmpty("Description"),
  }),
  updateExperience: z.object({
    _id: objectId,
    title: nonEmpty("Title"),
    period: nonEmpty("Period"),
    company: nonEmpty("Company"),
    description: nonEmpty("Description"),
  }),

  addProject: z.object({
    title: nonEmpty("Title"),
    description: nonEmpty("Description"),
    image: nonEmpty("Image URL"),
    link: z.string().trim().default(""),
    technologies: z.array(z.string()).default([]),
  }),
  updateProject: z.object({
    _id: objectId,
    title: nonEmpty("Title"),
    description: nonEmpty("Description"),
    image: nonEmpty("Image URL"),
    link: z.string().trim().default(""),
    technologies: z.array(z.string()).default([]),
  }),

  updateContact: z.object({
    _id: objectId,
    name: nonEmpty("Name"),
    email: z.string().trim().email("Invalid email"),
    mobile: nonEmpty("Mobile"),
    address: nonEmpty("Address"),
    gender: nonEmpty("Gender"),
  }),

  byId: z.object({ _id: objectId }),
};

module.exports = { validateBody, schemas };

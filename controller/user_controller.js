const Mark = require("../model/mark");
const User = require("../model/student_data");

exports.createUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    // Check if the user already exists based on email
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      // If user already exists, send a response indicating the user is already in the database
      return res.status(400).json({
        status: "error",
        message: "User with this email already exists in the database.",
      });
    }

    // If user does not exist, proceed to create a new user
    const newUser = await User.create(req.body);
    console.log(`Created user with id: ${newUser.id}`);

    // Create a corresponding record in the Mark table using the newly created user's id and name
    await Mark.create({ ref_id: newUser.id, name });

    // Respond with success status and the created user object
    res.status(200).json({
      status: "success",
      newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle other errors, such as database errors
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the user.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const newUser = await User.findAll();
    res.status(200).json({
      status: "all done",
      newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

exports.updatemark = async (req, res) => {
  try {
    const id = req.params.id; // Assuming the ID of the mark is passed as a URL parameter

    // Find the mark by ID
    const mark = await Mark.findOne({ where: { id } });

    if (!mark) {
      return res.status(404).json({
        status: "fail",
        message: "Mark not found",
      });
    }

    const { hindi, english, maths, gujarati, science } = req.body;

    if (
      hindi === undefined ||
      english === undefined ||
      maths === undefined ||
      gujarati === undefined ||
      science === undefined
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "All marks (hindi, english, maths, gujarati, science) are required",
      });
    }

    const total = hindi + english + maths + gujarati + science;
    const percentage = (total * 100) / 500;

    await mark.update({
      hindi,
      english,
      maths,
      gujarati,
      science,
      total,
      percentage,
    });

    res.status(200).json({
      status: "success",
      data: { mark },
    });
  } catch (error) {
    console.error("Error updating mark:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while updating the mark",
    });
  }
};

exports.findmark = async (req, res) => {
  try {
    const newUser = await Mark.findAll();

    newUser.sort((a, b) => b.percentage - a.percentage);
    res.status(200).json({
      status: "all done",
      newUser,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching users.",
    });
  }
};

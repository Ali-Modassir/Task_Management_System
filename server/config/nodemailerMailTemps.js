const client_origin = process.env.CLIENT_ORIGIN;

//Email Templates or Email subject and body
module.exports = {
  //confirm-email-template
  confirmEmailTemp: (id, name) => ({
    subject: `WELCOME ${name}`,
    html: `
          <h3>Hello, ${name}</h3>
          <br>
          <p>
            <br>You are receiving this because you have successfully registered to use Encomece services.
            <br>Please <a href='${client_origin}/auth/confirm/${id}'> CLICK HERE</a> to confirm your email address
            <br>or Copy and paste this link: ${client_origin}/auth/confirm/${id} in your browser to complete the authentication process
          </p>
        `,
  }),

  //Forgot-pswd-template
  forgotPswdTemp: (token, name) => ({
    subject: "Encomece Password Reset",
    html: `
      <h2>Hello, ${name}</h2>
      <p><br>You are receiving this because you (or someone else) have requested the reset of the password for your account.
         <br>Please <a href='${client_origin}/auth/reset/${token}'> CLICK HERE</a>
         <br>Please click on the following link, or paste this into your browser to complete the process:
         <br>${client_origin}/auth/reset/${token}
         <br>
         If you did not request this, please ignore this email and your password will remain unchanged
      </p>`,
  }),

  //pswd-change-template
  pswdChangeTemp: (name, email) => ({
    subject: "Your password has been changed",
    text:
      `Hello, ${name} \n\n` +
      `This is a confirmation that the password for your account ${email} \n` +
      " has just been changed.\n",
  }),

  //Sending task details to VE
  taskDetailsToVE: (
    name,
    userId,
    assignUserId,
    assignUserName,
    taskName,
    taskType,
    taskId,
    taskDescription
  ) => ({
    subject: "You have been assigned a task",
    html: `
     <h2>Hello, ${name}</h2>
     <p>A task is assigned to you by ${assignUserName}.</p>
     <h3>TASK DETAILS</h3>
     <p>Task Name: ${taskName}</p>
     <p>Task Type: ${taskType}</p>
     <p>Task Description: ${taskDescription}</p>
     <p><a href="${client_origin}/VE/dash/${assignUserId}=${taskId}=${userId}">CLICK HERE </a> to add this task on your dashboard <br/> or copy and paste this below link in your browser window.<br/>${client_origin}/VE/dash/${assignUserId}=${taskId}=${userId}</p>
    `,
  }),

  //Sending issue to admin
  sendIssue: (task, issueDescription, email) => ({
    subject: "Issue Triggered",
    html: `
      <p>The client ${email} is facing issue on ${task}</p>
      <h5>Issue Description</h5>
      <p>${issueDescription}</p>
    `,
  }),
};

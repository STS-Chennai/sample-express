Parse.Cloud.beforeSave("GameScore", function(request, response) {
  if (!request.headers["x-auth-token"]) {
    response.error("unauthrized access");
  } else {
    response.success();
  }
});

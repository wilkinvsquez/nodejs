const { response, request } = require("express");
const User = require("../models/user");

const getUser = (req = request, res = response) => {
  const { q, name = "No name", api_key, page = 1, limit } = req.query;
  res.json({
    ok: true,
    message: "getUser API",
    q,
    name,
    api_key,
    page,
    limit,
  });
};

const postUser = async (req, res = response) => {
  const body = req.body;
  const user = new User(body);
  await user.save();
  res.json({
    ok: true,
    message: "Post api",
    user,
  });
};

const putUser = (req, res = response) => {
  const { id } = req.params;
  res.json({
    ok: true,
    message: "putUser API",
    id,
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    ok: true,
    message: "deleteUser API",
  });
};

const patchUser = (req, res = response) => {
  res.json({
    ok: true,
    message: "patchUser API",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
  patchUser,
};

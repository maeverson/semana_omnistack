const express = require("express");

const { celebrate, Segments, Joi } = require("celebrate");

const sessionController = require("./controllers/sessionController");
const ongController = require("./controllers/ongController");
const incidentController = require("./controllers/incidentController");
const profileController = require("./controllers/profileController");
const routes = express.Router();

routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  sessionController.create
);

routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(3),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  ongController.create
);
routes.get("/ongs", ongController.list);

routes.post(
  "/incidents",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        ong_id: Joi.string().required()
      })
      .unknown()
  }),
  incidentController.create
);

routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object()
      .keys({
        page: Joi.number()
      })
      .unknown(),
    [Segments.HEADERS]: Joi.object()
      .keys({
        ong_id: Joi.string().required()
      })
      .unknown()
  }),
  incidentController.list
);

routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        id: Joi.number().required()
      })
      .unknown()
  }),
  incidentController.delete
);

routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        ong_id: Joi.string().required()
      })
      .unknown()
  }),
  profileController.list
);

module.exports = routes;

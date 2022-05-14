const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  console.log("============================");
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        through: ProductTag,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create({})
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      {
        console.log(err);
        res.status(500).json(err);
      }
    });
});

router.put("/:id", (req, res) => {
  Tag.update({})
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No tag found with this ID" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No tag found with this ID" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

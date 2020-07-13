const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json({ data: accounts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id", (req, res) => {

    db("accounts")
        .where({
            id: req.params.id
        })
        .first()
        .then((account) => {
            if (account != null) {
                res.status(200).json({data: account})
            }
            else {
                res.status(400).json({ message: `Cannot find the account with the id of ${req.params.id}`})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: error.message})
        })
})

router.post("/", (req, res) => {
    const accountData = req.body
    db("accounts")
        .insert(accountData, 'id')
        .then((ids) => {
            db("accounts")
                .where({id: ids[0]})
                .first()
                .then(account => {
                    res.status(201).json({account})
                })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({message: error.message})
        })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const changes = req.body

    db("accounts")
        .where({id})
        .update(changes)
        .then((count) => {
            if (count != null) {
                res.status(200).json(count)
            }
            else {
                res.status(400).json({message: `There is no post with the id of ${id}`})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({message: error.message})
        })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params

    db("accounts")
        .where({id})
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({count})
            }
            else {
                res.status(400).json({message: "Record not found"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: error.message})
        })
})

module.exports = router;

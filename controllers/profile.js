const handleProfileGet = (req, res, db) => {

    const { id } = req.params;
    db.select('*').from('users').where({
        id
    })
    .then(user => {
        if (user.length) {
        res.json(user[0])
        }
        else {
            res.status(400).json('This kind of Id is not in DB.')
        }
        })
    .catch(err => res.status(400).json('error getting user'))

}

module.exports = { handleProfileGet };
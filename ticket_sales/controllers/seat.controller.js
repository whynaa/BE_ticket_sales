/** load model for `seats` table */
const seatModel = require(`../models/index`).seat

/** load Operation from  Sequelize  */
const Op = require(`sequelize`).Op

/** create function for read all data */
exports.getAllSeat = async (request, response) => {
    /** call findAll() to get all data */
    let seats = await seatModel.findAll()
    return response.json({
        success: true,
        data: seats,
        message: `All seats have been loaded`
    })
}

/** create function for filter */
exports.seatByEvent = async (request, response) => {
    /** define keyword to find data */
    let eventID = request.params.id

    /** call findAll() within where clause and operation 
     * to find data based on keyword  */
    let seats = await seatModel.findAll({
        where: {
            eventID: { [Op.substring]: eventID }
        }
    })
    return response.json({
        success: true,
        data: seats,
        message: `All seats have been loaded`
    })
}

/** create function for add new seat */
exports.addSeat = (request, response) => {
    /** prepare data from request */
    let newSeat = {
        eventID: request.body.eventID,
        rowNum: request.body.rowNum,
        seatNum: request.body.seatNum,
        status: request.body.status
    }

    /** execute inserting data to seat's table */
    seatModel.create(newSeat)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: `New seat has been inserted`
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for update seat */
exports.updateSeat = (request, response) => {
    /** prepare data that has been changed */
    let dataSeat = {
        eventID: request.body.eventID,
        rowNum: request.body.rowNum,
        seatNum: request.body.seatNum,
        status: request.body.status
    }

    /** define id seat that will be update */
    let seatID = request.params.id

    /** execute update data based on defined id seat */
    seatModel.update(dataSeat, { where: { seatID : seatID } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data seat has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for delete data  */
exports.deleteSeat = (request, response) => {
    /** define id seat that will be update */
    let seatID = request.params.id

    /** execute delete data based on defined id seat */
    seatModel.destroy({ where: { seatID: seatID } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data seat has been deleted`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}
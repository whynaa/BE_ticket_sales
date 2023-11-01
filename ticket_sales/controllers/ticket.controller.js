/** load model */
const seatModel = require(`../models/index`).seat
const userModel = require(`../models/index`).user
const eventModel = require(`../models/index`).event
const ticketModel = require(`../models/index`).ticket

/** load Operation from  Sequelize  */
const Op = require(`sequelize`).Op

/** create function for read all data */
exports.getAllTicket = async (request, response) => {
    /** call findAll() to get all data */
    let tickets = await ticketModel.findAll(
        {
            include: [
                { model: eventModel, attributes: ['eventName','eventDate','venue']},
                { model: userModel, attributes: ['firstName', 'lastName']},
                { model: seatModel, attributes: ['rowNum', 'seatNum']},
            ]
        }
    )
    return response.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    })
}

/** create function for filter ticket by ID */
exports.ticketByID = async (request, response) => {
    /** define ticketID to find data */
    let ticketID = request.params.id

    /** call findAll() within where clause and operation 
     * to find data based on ticketID  */
    let tickets = await ticketModel.findAll({
        where: {
            ticketID: { [Op.substring]: ticketID } 
        },
        include: [
            { model: eventModel, attributes: ['eventName','eventDate','venue']},
            { model: userModel, attributes: ['firstName', 'lastName','email']},
            { model: seatModel, attributes: ['rowNum', 'seatNum']},
        ]
    })
    return response.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    })
}

/** create function for filter ticket by Event */
exports.ticketByEvent = async (request, response) => {
    /** define eventID to find data */
    let eventID = request.params.id

    /** call findAll() within where clause and operation 
     * to find data based on eventID  */
    let tickets = await ticketModel.findAll({
        where: {
            eventID: { [Op.substring]: eventID } 
        },
        include: [
            { model: eventModel, attributes: ['eventName','eventDate','venue']},
            { model: userModel, attributes: ['firstName', 'lastName','email']},
            { model: seatModel, attributes: ['rowNum', 'seatNum']},
        ]
    })
    return response.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    })
}

/** create function for filter ticket by User */
exports.ticketByUser = async (request, response) => {
    /** define userID to find data */
    let userID = request.params.id

    /** call findAll() within where clause and operation 
     * to find data based on userID  */
    let tickets = await ticketModel.findAll({
        where: {
            userID: { [Op.substring]: userID } 
        },
        include: [
            { model: eventModel, attributes: ['eventName','eventDate','venue']},
            { model: userModel, attributes: ['firstName', 'lastName']},
            { model: seatModel, attributes: ['rowNum', 'seatNum']},
        ]
    })
    return response.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    })
}

/** create function for add new ticket */
exports.addTicket = async (request, response) => {
    /** prepare date for bookedDate */
    const today = new Date()
    const bookedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    const { eventID, userID, seats } = request.body;

    try {
        // Create seat records for the chosen seats
        const seatIDs = await Promise.all(seats.map(async seat => {
          const { rowNum, seatNum } = seat;
          const createdSeat = await seatModel.create({
            eventID,
            rowNum,
            seatNum,
            status: 'true'
          });
          return createdSeat.seatID;
        }));
    
        // Create ticket records associating the chosen seats
        const tickets = await ticketModel.bulkCreate(seatIDs.map(seatID => ({
          eventID,
          userID,
          seatID,
          bookedDate
        })));
    
        response.status(201).json(tickets);
      } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
      }
}
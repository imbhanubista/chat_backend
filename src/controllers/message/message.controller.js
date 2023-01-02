const { successResponse, errorResponse } = require('../../constrants/response');
const {findMessagesByChatroomId} = require('../../services/message');

exports.getMessages = async (req, res) => {
    let id = req.body;
    try {
        const messages = await findMessagesByChatroomId(id);
        res.json({
        type: successResponse,
        message: 'Available messages',
        data: messages,
        });
    } catch (err) {
        res.json({
        type: errorResponse,
        message: serverError,
        });
    }

}
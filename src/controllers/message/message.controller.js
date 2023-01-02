const { serverError } = require('../../constrants/commonResponse');
const { successResponse, errorResponse } = require('../../constrants/response');
const {findMessagesByChatroomId} = require('../../services/message');

exports.getMessages = async (req, res) => {
    try {
        const messages = await findMessagesByChatroomId(req.params.id);
        res.json({
            type: successResponse,
            message: 'Available messages',
            data: messages,
        });
    }
    catch (err) {
        console.log(err)
        res.json({
            type: errorResponse,
            message: serverError,
        });
    }


}
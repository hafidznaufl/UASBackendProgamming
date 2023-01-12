class Controller{

    static async response( status, message, data = null ){

        const arr = {

            status : status,
            message : message
        }
        
        if (data != null) {

            arr.data = data

        }

        res.status(status).json(arr)
    }
}

module.exports = Controller
class Room {
    _wsList = []; //ws
    _id;


    constructor(id) {
        this._id = id;

    }

    get id() {
        return this._id;
    }

    getOthersWs(myWs) {
        let rivalWs = null;
        let index = 0;
        for (const element of this._wsList) {
            if (element != myWs) {
                rivalWs = element;
            }

            index++;
        };
        return rivalWs;
    }
    sendOthersWs(data, myWs) {
        for (const element of this._wsList) {
            if (element != myWs) {
                element.send(data);
            }
        };

    }
    sendToAll(data) {

        //let index = 0;
        //console.log('WsList =============');
        // console.log(this._wsList);
        for (const element of this._wsList) {
            element.send(data);
            // index++;
        };
        //return true;
    }

    get wsCount() {
        return this._wsList.length;
    }
    addWs(ws) {

        if (!this._wsList.includes(ws)) {
            this._wsList.push(ws);
            //console.log('Add------WsList =============');
            //console.log(ws);
        }

    }


    removeWs(ws) {
        const index = this._wsList.indexOf(ws);
        if (index > -1) {
            this._wsList.splice(index, 1);
        }
        //console.log('------------//----removeWs-----//---------')
        //console.log(this._wsList);
    }
}

module.exports = Room;
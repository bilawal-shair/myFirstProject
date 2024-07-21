import SQLite from "react-native-sqlite-storage"

const getDB = () =>{

    return SQLite.openDatabase({

        name:"mydb14.db"
        
    });

}

export default getDB();
import userContext from './UsersContext';

const UserStateProvider = (props: (any)) => {

    const data1 = {   
        "metersInfo" : "",     
        "basicInfo": "",
        "histInfo": "",

        
    }
    
    return (
        <userContext.Provider value={data1}>
            {props.children}
        </userContext.Provider>
    )


}

export default UserStateProvider;
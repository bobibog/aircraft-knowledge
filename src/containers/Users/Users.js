import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import {crudUserHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import Heading from '../../components/CRUD/Customer/Heading';


const Users = props => {
    const users = useSelector(state => {
        return state.user.users;
    });
    console.log(users);

    const usersCount = useSelector(state => {
        return state.user.usersCount;
    });
    const loading = useSelector(state => {
        return state.user.usersLoading;
    });
    const offset = useSelector(state => {
        return state.user.usersOffset;
    });
    const limit = useSelector(state => {
        return state.user.usersLimit;
    });
    const page = useSelector(state => {
        return state.user.usersPage;
    });   
           
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[role, setRole] = useState('');
    
    const dispatch = useDispatch();
    
    const onFetchUsers = useCallback(
        () => dispatch(actions.fetchUsers(offset, limit, username, password, role))
        , [dispatch, offset, limit, username, password, role]
    );
    
    

    const onSetUsersOffsetLimit = (offset, limit) => dispatch(actions.setUsersOffsetLimit(offset, limit));    
    const onSetUsersPage = (page) => dispatch(actions.setUsersPage(page));    
     

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetUsersOffsetLimit(tableOffset, tableLimit);   
    };
    const setUsersPageHandler = page => {                
        onSetUsersPage(page);
    };      
         
       
    useEffect(() => { 
        onFetchUsers();
        
    }, [onFetchUsers]);     
     
    
    let usersTable = <Spinner />;
    if (!users && !loading  ) {
        usersTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read users from the server!</p>;
    }
    
    if (users && !loading ) {
        usersTable = <Table 
            data={users}
            header={crudUserHeader}            
            rowsPerPageDef={limit}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            totalDataCount={usersCount}
            setPageStore={setUsersPageHandler}
            currPage={page}  
                       
            /> ;        
    }      
    
    return (
        <React.Fragment>    
            <Heading/>   
                                                 
            {usersTable}            
        </React.Fragment>        
    );
};

export default withErrorHandler(Users, axios);
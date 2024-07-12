import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';

//backend ocekuje samo konkretan search parametar a ostali ce se povuci sa bilo kojim vrednostima
//odnosno ako zelimo sve umesto slanja ovoga timestampMin=&timestampMax=&stationId=&channel=&freqMin=&freqMax=&levelMin=&levelMax=&errorMin=&errorMax=&mode=&label=&blockId=&ack=&tail=&flight=&msgno=&text=&end=&acarsMessageDateTimeMin=2024-07-04+17%3A06%3A11&acarsMessageDateTimeMax=2024-07-05+17%3A06%3A11&altMin=&altMax=&dsta=&icao=&isOnground=&isResponse=&latMin=&latMax=&lonMin=&lonMax=&toAddr=&type=&company=Aviolog&offset=0&limit=10&parsedText=&consensusResult=&aggregationStatus=&consensusStatus=
//saljemo samo queryString=''

//a ako zelimo konkretan search onda queryString='channel=4' a ostale sa '' ne saljemo
//ne znamo u ovoj funkciji da li je filter ili ne filter kolona jer nema identifikatora a backend je namesten da radi tako da mu se posalje ili vrednost min 1 filter kolone ili samo ''(ako nema filtera)
//limit i offset nisu deo filter kolona ali limit utice da li ce se desiti filtriranje
//da bismo razlikovali filter i nefilter kolone onda cemo parsirati vrednost querya tako da ostanu samo kolone sa vrednoscu(min 1) koje su zapravo filter ili ako nema vrednosti onda bez filtera(sve) odnosno '' jer se takvi formati ocekuju na backend          
/*
function removeEmptyParams(queryString) {

    console.log(queryString+" before")

    const params = new URLSearchParams(queryString);
    let keys = [...params.keys()];

    keys.forEach(key => {
        if (!params.get(key))
            params.delete(key);//ako nema vrednosti u query
    });

    return params.toString();
}
*/

//akcije su samo parametri za reducera ali apstrakovani tako da menjaju jedinicni deo state
//1 reducer se trigeruje od vise akcija odnosno utice na deo state
//svi reduceri se trigeruju od svih akcija za ceo state
export const setAkrxOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_AKRX_OFFSET_LIMIT,//
        offset: offset,
        limit: limit
    }
};

export const setAkrxPage = (page) => {
    return {
        type: actionTypes.SET_AKRX_PAGE,
        page: page
    }
};
                                //akciji se prosledjuju podaci koje cemo wrapovati u objekat i kojim zelimo da azuriramo state i ne moraju svi da se proslede iz state
export const fetchAkrxSuccess = (acarsMessages, acarsMessagesCount) => {
    return {
        type: actionTypes.FETCH_AKRX_SUCCESS,
        acarsMessages: acarsMessages,
        acarsMessagesCount: acarsMessagesCount
    }
};

export const fetchAkrxFail = (error) => {
    return {
        type: actionTypes.FETCH_AKRX_FAIL,
        error: error
    }
};

export const fetchAkrxStart = () => {
    return {
        type: actionTypes.FETCH_AKRX_START
    }
};
            //////////////////////////////////////////////
            //funkcija fetchAkrx i za inicijalni fetch svih kolona i za search odnosno filter vrsta po vrednosti nekih kolona odnosno ne znamo da li je inicijalni fetch ili search jer saljemo sve kolone u ovu funkciju tako da ih jedino razlikujemo da li su poslate sa '' ili sa vrednoscu
            //ako su poslate u fetchAkrx sa '' onda mogu i ne moraju biti deo filtera u zavisnosti da li postoje u filteru i da li je korisnik nesto uneo
            //ako su poslate u fetchAkrx sa vrednoscu onda je definitivno deo filtera
           
            //limit i offset nisu obavezni za query ka backend(postoje defaultni)
            //defaultni limit je 100 a offset ne znamo a ukupno ima 100001 objekata
            //objekti sa backend se stalno menjaju za isti request offseta i limita
            //odnosno acarsMessagesCount znaci koliko ukupno ima na backend a ne koliko se vratilo
            
            //offset na backend ne mozemo znati ali znamo da postoji defaultna vrednost
            
            //ako se ne prosledjuje odavde limit niti offset znaci da se vraca 100 objekata(limit=100) defaultno sa backend
            //tih 100 objekata ukoliko se prosledi neki min 1 filter ce biti filtrirano na backend

                                     //       //
export const fetchAkrx = (          offset, limit,            timestampMin, timestampMax,
    stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
    flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
    isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type, company) => {
    
    // => ({}) == => {return {}}

           //vracamo thunk funkciju umesto obicnog objekta a onda ce je redux thunk middleware dobiti pre redux reducera
           //kada dodje do middleware onda on zove thunk funkciju koja sadrzi asinhrone pozive a u njoj mozemo nakon njihovog izvrsenja da zovemo obicne redux akcije 

           //moze i sa parametrom getState odnosno (dispatch,getState)
  
        
    return dispatch => {
                //pozivamo akciju a ne mozemo znati koji ce reducer okinuti odnosno 1 akcija : N reducera
        dispatch(fetchAkrxStart());       
        
        // Converting Local in UTC
        var acarsMINUtc="";
        if(acarsMessageDateTimeMin!=''){
            var acarsMINUtc = new Date(acarsMessageDateTimeMin).toUTCString();
            //console.log("Datum="+ acarsMINUtc);
        }
        var acarsMAXUtc="";
        if(acarsMessageDateTimeMax!=''){
            var acarsMAXUtc = new Date(acarsMessageDateTimeMax).toUTCString();
            //console.log("Datum="+ acarsMAXUtc);
        }                
                  
        const query = new URLSearchParams();//query.append('timestampMin', '1') znaci timestampMin=1 a ako uradimo jos jednom .append onda se dodaje & automatski
            
        query.append('timestampMin', timestampMin);//nije deo objekta ali jeste tabele
        query.append('timestampMax', timestampMax);
        query.append('stationId', stationId);
        query.append('channel', channel);
        query.append('freqMin', freqMin);
        query.append('freqMax', freqMax);
        query.append('levelMin', levelMin);//nije deo objekta ali jeste tabele
        query.append('levelMax', levelMax);
        query.append('errorMin', errorMin);
        query.append('errorMax', errorMax);
        query.append('mode', mode);
        query.append('label', label);
        query.append('blockId', blockId);
        query.append('ack', ack);
        query.append('tail', tail);
        query.append('flight', flight);
        query.append('msgno', msgno);
        query.append('text', text);
        query.append('end', end);
        query.append('acarsMessageDateTimeMin', acarsMessageDateTimeMin);//nije deo objekta ali saljemo vrednost za filter 
        query.append('acarsMessageDateTimeMax', acarsMessageDateTimeMax);        
        query.append('altMin', altMin);//nije deo objekta ali jeste tabele
        query.append('altMax', altMax);
        query.append('dsta', dsta);
        query.append('icao', icao);
        query.append('isOnground', isOnground);
        query.append('isResponse',isResponse);
        query.append('latMin', latMin);//nije deo objekta ali saljemo vrednost za filter 
        query.append('latMax', latMax);
        query.append('lonMin',lonMin);
        query.append('lonMax', lonMax);        
        query.append('toAddr', toAddr);
        query.append('type',type);

        //nema u filteru a predefinisano filtriramo po njoj company=Aviolog i pri filtriranju ne postoji a ne moze korisnik manuelno da iskljuci
        //query.append('company',company);//company ne postoji odnosno ne menja se iz search a ipak je u query pa cemo dodati i parsedText i consensusResult iako ne searchujemo po njima odnosno ovde su i search i ne search kolone
        
        
        query.append('offset', offset);//0 inicijalno
        query.append('limit', limit);//10 inicijalno
        

        console.log("da6")

        //deo 1) 
        let queryString = limit !== "-1"            
        ? query//uvek
        : '';//nikada

        /*
        //deo 2) 
        let queryString = limit !== "-1"            
        ? query
        : '';
        */

        //deo 3)
        //////////////////////////////////////////////
        /*
        let queryString = limit === "-1"
            ? ''

               : removeEmptyParams(query.toString()).toString()//zapravo znaci ako postoji min 1 search kolona koja nije '' jer se u query sa .append racuna i '' 
                                //ako se ne uradi query.toString() vec samo query onda se dobija URLSearchParams {size: 40}
        */
        //////////////////////////////////////////////


        /*
        //radi
        let queryString = limit === "-1"
                ? ''
                : 'channel=4'
        */

        /*
        //console.log(channel+"n")
        //console.log(query.toString())
        console.log(queryString+" after")
        //console.log(query.toString())
        */

/*
////////////////////////////////////////////////
///////////////////////////////////////////////

-da bi uopste queryString radio potrebno je zakomenentarisati company jer vrednost company=Aviolog ne postoji na backend

1) slucaj

limit=10

-uvek ulazi u query i bez koriscenja filtera jer se zapravo jedino u filter i menja limit sa set
-uvek ulazi u query iako se klikne search ili reset jer:
	-setovanje pri search ga uvek odrzava zbog set(limit) a do setovanja pri search se ne menja
	-setovanje pri reset ga postavlja na 10 sto je zapravo ista prethodna vrednost

let queryString = limit !== "-1"            
       ? query//uvek
       : '';//nikada
         
zakljucak je da se uvek koristi limit=10 odnosno nikada default od backend jer se nikada ne aktivira ''

2) slucaj

limit=-1

-uvek ulazi u '' sve dok se ne iskoristi reset u filteru min 1
-ako se klikne na reset u filteru desava se setovanje na 10 sto nas vraca na slucaj 1)
-ako se klikne na search u filteru uvek se odrzava zbog set(limit) a do setovanja pri search se ne menja

let queryString = limit !== "-1"            
       ? query
       : '';//uvek dok se min 1 ne uradi reset u filteru onda je samo query
         
zakljucak je da se koristi default limit od backend jer se uvek aktivira '' i ne moze se aktivirati search sve dok se min 1 ne iskoristi reset

3) slucaj

limit=-1

submitSearchHandler 
onSetAkrxOffsetLimit(0, 10)//ukljucujemo limit jer je prethodno ukljucen filter

resetSearchHandler
onSetAkrxOffsetLimit(0, "-1")//iskljucujemo limit jer je prethodno iskljucen filter

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
*/


        axios.get(`/AcarsMessage?`+ queryString)
            .then(response => { 
                        //sada dispatchujemo obicne akcije da wrapujemo rezultat async poziva u objekat za azuriranje state koji ide u reducere odnosno konkretnog reducera                    
                dispatch(fetchAkrxSuccess(response.data['acarsMessages'], response.data['acarsMessagesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAkrxFail(error));                                
            }    
        );        
    }
};




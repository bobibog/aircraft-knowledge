import { formatMs } from "@material-ui/core";

export const rowsPerPageDefault = 10;

export const airlineHeader = [
    {
        name: "Name",
        prop: "airlineName",
        linkRoute: [
            "/aircraft", "airlineId"
        ],
        // dataCellCreator: [
        //     "city", " (", "airportIata", ")"
        // ],
    },
    {
      name: "IATA",
      prop: "iata"     
    },
    {
      name: "ICAO",
      prop: "icao"
    },
    {
      name: "Fleet",
      prop: "fleet"
    }
];

// export const airline = {
//     airlineId:"",
//     airlineName:"",
//     iata:"",
//     icao:"",
//     fleet:""
// }

export const aircraftSearchHeader = [
    
    {
        name: "Registration",
        prop: "registration",
        linkRoute: [
            "/flights", "aircraftId"
        ],
    },    
    {
        name: "Type Code",
        prop: "typeCode"
    },
    {
        name: "Full Type",
        prop: "aircraftType"
    },    
    {
        name: "Serial No.",
        prop: "serialNumber"
    },
    {
        name: "Mode S",
        prop: "modeS"
    },
    {
        name: "Produced",
        prop: "manufactureDate"
    },
    {        
        name: "Airline",
        prop: 'airline',
        type:"airlineHeader",
        linkRoute: [
            "/aircraft", "airlineId"
        ],
        dataCellCreator: [
            "airlineName"
        ],
    },
    {
        name: "Operator",
        prop: "operator",
        type: "airlineHeader",
        linkRoute: [
            "/aircraft", "airlineId"
        ],
        dataCellCreator: [
            "airlineName"
        ],
    }
    
];

export const aircraftHeader = [
    {
        name: "Registration",
        prop: "registration",
        linkRoute: [
            "/flights", "aircraftId"
        ],
    },
    {
        name: "Airline",
        prop: "airline",
        type: "airlineHeader",
        dataCellCreator: [
            "airlineName"
        ],
    },
    {
        name: "Type Code",
        prop: "typeCode"
    },
    {
        name: "Aircraft Type",
        prop: "aircraftType"
    },        
    {
        name: "Serial Number",
        prop: "serialNumber"
    },
    {
        name: "Mode S",
        prop: "modeS"
    },
    {
        name: "Age",
        prop: "age"
    },
    {
        name: "Operator",
        prop: "operator",
        type: "airlineHeader",
        linkRoute: [
            "/aircraft", "airlineId"
        ],
        dataCellCreator: [
            "airlineName", " (", "iata", "/", "icao", ")"
        ],
    },
];

export const airportHeader = [
    {
      name: "Name",
      prop: "airportName"
    },
    {
      name: "IATA",
      prop: "airportIata"
    },
    {
      name: "City",
      prop: "city"
    },
    {
      name: "Country",
      prop: "country"
    }
];

export const flightHeader = [
    {
        name: "Code",
        prop: "flightCode"
    },
    {
        name: "Date",
        prop: "flightDate",
        type: "datetime"
    },
    {
        name: "From",
        prop: "fromAirport",
        type: "airportHeader",
        linkRoute: [
            "/airports", "airportId"
        ],
        dataCellCreator: [
            "city", " (", "airportIata", ")"
        ],
    },
    {
        name: "To",
        prop: "toAirport",
        type: "airportHeader",
        linkRoute: [
            "/airports", "airportId"
        ],
        dataCellCreator: [
            "city", " (", "airportIata", ")"
        ],
    },
    {
        name: "Duration",
        prop: "flightTime"
    },
    {
        name: "Std",
        prop: "flightStd",
        type: "timespan"
    },
    {
        name: "Atd",
        prop: "flightAtd",
        type: "timespan"
    },
    {
        name: "Sta",
        prop: "flightSta",
        type: "timespan"
    },
    {
        name: "Status",
        prop: "flightStatus"
    },
    {
        name: "Landed",
        prop: "flightLanded",
        type: "timespan"
    },
    {
        name: "Diverted",
        prop: "divertedToAirport",
        type: "airportHeader",
        linkRoute: [
            "/airports", "airportId"
        ],
        dataCellCreator: [
            "city", " (", "airportIata", ")"
        ],
    },
    // {
    //     name: "Aircraft",
    //     prop: "aircraftId"
    // }
];

// var dateString = "acarsMessageDateTime";
// var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
// var dateArray = reggie.exec(dateString); 
// var dateObject = new Date(
//     (+dateArray[1]),
//     (+dateArray[2])-1, // Careful, month starts at 0!
//     (+dateArray[3]),
//     (+dateArray[4]),
//     (+dateArray[5]),
//     (+dateArray[6])
// );


export const akrxHeader = [
    {
        name: "Message Time",
        prop: "acarsMessageDateTime",        
        type:"datetime"
    },
    {
        name: "Tail",
        prop: "tail"
    },
    {
        name: "Flight",
        prop: "flight"
    },
    {
        name: "Text",
        prop: "text"
    },
    {
      name: "Frequency",
      prop: "freq"
    },
    {
      name: "Timestamp",
      prop: "timestamp"
    },
    {
      name: "Station ID",
      prop: "stationId"
    },
    {
      name: "Channel",
      prop: "channel"
    },
    
    {
        name: "Level",
        prop: "level"
      },
      {
        name: "Error",
        prop: "error"
      },
      {
        name: "Mode",
        prop: "mode"
      },
      {
        name: "Label",
        prop: "label"
      },
      {
        name: "Block ID",
        prop: "blockId"
      },
      {
        name: "Ack",
        prop: "ack"
      },      
      
      {
        name: "Mesage Num.",
        prop: "msgno"
      },
      
      {
        name: "End",
        prop: "end"
      }
      
];

export const crudUserHeader = [
    {
        name: "Username",
        prop: "username"        
    },
    {
      name: "Password",
      prop: "password"     
    },
    {
      name: "Role",
      prop: "role"
    }
];

export const airlinesInit = [
    {AirlineId: 1, AirlineName: 'ABX Air', IATA: 'GB', ICAO: 'ABX', Fleet: 15},
    {AirlineId: 2, AirlineName: 'ACE Belgium Freighters', IATA: 'X7', ICAO: 'FRH', Fleet: 1},
    {AirlineId: 3, AirlineName: 'Advanced Air', IATA: 'AN', ICAO: 'WSN', Fleet: 3},
    {AirlineId: 4, AirlineName: 'Aegean Airlines', IATA: 'A3', ICAO: 'AEE', Fleet: 53},
    {AirlineId: 5, AirlineName: 'Aer Lingus', IATA: 'EI', ICAO: 'EIN', Fleet: 68},
    {AirlineId: 6, AirlineName: 'AerCaribe', IATA: 'JK', ICAO: 'ACL', Fleet: 3},
    {AirlineId: 7, AirlineName: 'Aero Contractors', IATA: '', ICAO: 'NIG', Fleet: 3},
    {AirlineId: 8, AirlineName: 'Aero Mongolia', IATA: 'M0', ICAO: 'MNG', Fleet: 5},
    {AirlineId: 9, AirlineName: 'Aero-Dienst', IATA: '', ICAO: 'ADN', Fleet: 9},
    {AirlineId: 10, AirlineName: 'Aerodynamics', IATA: '4A', ICAO: 'DYN', Fleet: 2},
    {AirlineId: 11, AirlineName: 'Aero Union', IATA: '6R', ICAO: 'TNO', Fleet: 8}
];

export const aircraftsInit = [
    {AircraftId: 1, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N312AA', SerialNumber: '22315', ModeS: 'A34E40', Age: 35},
    {AircraftId: 2, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N740AX', SerialNumber: '22213', ModeS: 'A9F2A0', Age: 37},
    {AircraftId: 3, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N744AX', SerialNumber: '22221', ModeS: 'AA017C', Age: 36},
    {AircraftId: 4, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N749AX', SerialNumber: '22226', ModeS: 'AA140F', Age: 36},
    {AircraftId: 5, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N750AX', SerialNumber: '22227', ModeS: 'AA1A1F', Age: 35},
    {AircraftId: 6, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N767AX', SerialNumber: '22785', ModeS: 'AA5B9F', Age: 36},
    {AircraftId: 7, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N768AX', SerialNumber: '22786', ModeS: 'AA5F56', Age: 36},
    {AircraftId: 8, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N774AX', SerialNumber: '22789', ModeS: 'AA77F9', Age: 36},
    {AircraftId: 9, AirlineName: 'ABX Air', TypeCode: 'B762', AircraftType: 'Boeing 767-223(BDSF)', Registration: 'N795AX', SerialNumber: '23145', ModeS: 'AACAAE', Age: 34},
    {AircraftId: 10, AirlineName: 'ABX Air', TypeCode: 'B763', AircraftType: 'Boeing 767-383(ER)(BDSF)', Registration: 'N219CY', SerialNumber: '24358', ModeS: 'A1DB3A', Age: 30},
    {AircraftId: 11, AirlineName: 'ABX Air', TypeCode: 'B763', AircraftType: 'Boeing 767-383(ER)(BDSF)', Registration: 'N226CY', SerialNumber: '26544', ModeS: 'A1F794', Age: 28},
    {AircraftId: 12, AirlineName: 'ABX Air', TypeCode: 'B763', AircraftType: 'Boeing 767-383(ER)(BDSF)', Registration: 'N317CM', SerialNumber: '24317', ModeS: 'A36110', Age: 31}
];

export const airportsInit = [
    {AirportId: 1, AirportName: 'Seattle Tacoma International Airport', AirportIATA: 'SEA', City: 'Seattle', Country: 'United States'},
    {AirportId: 2, AirportName: 'Portland International Airport', AirportIATA: 'PDX', City: 'Portland', Country: 'United States'},
    {AirportId: 3, AirportName: 'Cincinnati', AirportIATA: 'CVG', City: 'Cincinnati', Country: 'United States'},
    {AirportId: 4, AirportName: 'Norfolk', AirportIATA: 'NGU', City: 'Norfolk', Country: 'United States'},
    {AirportId: 5, AirportName: 'Guantanamo', AirportIATA: 'GAO', City: 'Guantanamo', Country: 'Cuba'},
    {AirportId: 1002, AirportName: 'Norfolk', AirportIATA: 'ORF', City: 'Norfolk', Country: 'United States'},
    {AirportId: 1003, AirportName: 'Mc Guire AFB', AirportIATA: 'WRI', City: 'Wrightstown', Country: 'United States'},
    {AirportId: 1004, AirportName: 'Lajes', AirportIATA: 'TER', City: 'Lajes', Country: 'Portugal'},
    {AirportId: 1005, AirportName: 'Ramstein Air Base', AirportIATA: 'RMS', City: 'Ramstein', Country: 'Germany'},
    {AirportId: 1006, AirportName: 'Cairo', AirportIATA: 'CAI', City: 'Cairo', Country: 'Egypt'},
    {AirportId: 1007, AirportName: 'Mildenhall', AirportIATA: 'MHZ', City: 'Mildenhall', Country: 'United Kingdom'},
    {AirportId: 1008, AirportName: 'Ontario International Airport', AirportIATA: 'ONT', City: 'Ontario', Country: 'United States'},
    {AirportId: 1009, AirportName: 'St. Louis', AirportIATA: 'STL', City: 'St. Louis', Country: 'United States'},
    {AirportId: 1010, AirportName: 'Baltimore', AirportIATA: 'BWI', City: 'Baltimore', Country: 'United States'}
];

export const flightsInit = [
    {FlightId: 933, FlightCode: 'GB3482', FlightDate: '2020-01-27', FromAirportName: 'Charlotte (CLT)', ToAirportName: 'Cincinnati (CVG)', FlightTime: '61', FlightStd: '06:00', FlightAtd: '06:40', FlightSta: '07:41', FlightStatus: 'Landed', FlightLanded: '07:41', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 934, FlightCode: 'GB3406', FlightDate: '2020-01-27', FromAirportName: 'Wilmington (ILN)', ToAirportName: 'Charlotte (CLT)', FlightTime: '52', FlightStd: '01:19', FlightAtd: '01:29', FlightSta: '02:20', FlightStatus: 'Landed', FlightLanded: '02:21', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 935, FlightCode: 'GB3403', FlightDate: '2020-01-26', FromAirportName: 'Charlotte (CLT)', ToAirportName: 'Wilmington (ILN)', FlightTime: '57', FlightStd: '18:39', FlightAtd: '18:57', FlightSta: '19:56', FlightStatus: 'Landed', FlightLanded: '19:54', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 936, FlightCode: 'GB3427', FlightDate: '2020-01-26', FromAirportName: 'Charlotte (CLT)', ToAirportName: '', FlightTime: '', FlightStd: '', FlightAtd: '', FlightSta: '', FlightStatus: 'Scheduled', FlightLanded: '', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 937, FlightCode: 'GB3427', FlightDate: '2020-01-26', FromAirportName: 'Cincinnati (CVG)', ToAirportName: 'Charlotte (CLT)', FlightTime: '69', FlightStd: '14:43', FlightAtd: '15:36', FlightSta: '16:44', FlightStatus: 'Landed', FlightLanded: '16:45', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 938, FlightCode: 'GB903', FlightDate: '2020-01-24', FromAirportName: 'Seattle (SEA)', ToAirportName: 'Cincinnati (CVG)', FlightTime: '229', FlightStd: '19:56', FlightAtd: '20:12', FlightSta: '03:04', FlightStatus: 'Landed', FlightLanded: '03:01', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 939, FlightCode: 'GB903', FlightDate: '2020-01-24', FromAirportName: 'Portland (PDX)', ToAirportName: 'Seattle (SEA)', FlightTime: '33', FlightStd: '18:12', FlightAtd: '18:33', FlightSta: '18:42', FlightStatus: 'Landed', FlightLanded: '19:06', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 940, FlightCode: 'GB904', FlightDate: '2020-01-24', FromAirportName: 'Seattle (SEA)', ToAirportName: 'Portland (PDX)', FlightTime: '28', FlightStd: '08:09', FlightAtd: '10:32', FlightSta: '08:56', FlightStatus: 'Landed', FlightLanded: '10:59', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 941, FlightCode: 'GB904', FlightDate: '2020-01-24', FromAirportName: 'Cincinnati (CVG)', ToAirportName: 'Seattle (SEA)', FlightTime: '247', FlightStd: '05:06', FlightAtd: '05:56', FlightSta: '07:03', FlightStatus: 'Landed', FlightLanded: '07:03', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 942, FlightCode: 'GB90', FlightDate: '2020-01-17', FromAirportName: 'Norfolk (NGU)', ToAirportName: 'Cincinnati (CVG)', FlightTime: '88', FlightStd: '15:00', FlightAtd: '15:22', FlightSta: '16:49', FlightStatus: 'Landed', FlightLanded: '16:50', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 943, FlightCode: 'GB2251', FlightDate: '2020-01-17', FromAirportName: 'Guantanamo (GAO)', ToAirportName: '', FlightTime: '178', FlightStd: '', FlightAtd: '11:02', FlightSta: '', FlightStatus: 'Landed', FlightLanded: '19:00', DivertedToAirport: '', AircraftRegistration: 'N312AA'},
    {FlightId: 944, FlightCode: 'GB91', FlightDate: '2020-01-17', FromAirportName: 'Norfolk(ORF)', ToAirportName: '', FlightTime: '', FlightStd: '', FlightAtd: '06:43', FlightSta: '', FlightStatus: 'Unknown', FlightLanded: '', DivertedToAirport: '', AircraftRegistration: 'N312AA'}
];

export const airlineHeader = [
    {
      name: "Name",
      prop: "airlineName"
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

export const aircraftsHeader = [
    {
        name: "Registration",
        prop: "registration"
    },
    // {
    //     name: "Airline",
    //     prop: "airline.airlineName"
    // },
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
    }
];

export const airportsHeader = [
    {
      name: "Name",
      prop: "AirportName"
    },
    {
      name: "IATA",
      prop: "AirportIATA"
    },
    {
      name: "City",
      prop: "City"
    },
    {
      name: "Country",
      prop: "Country"
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
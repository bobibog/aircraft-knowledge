export const COLUMNS=[
    {
        Header: "CREATED On",
        accessor: "createdOn",
        Cell: ({ value }) => { return JSON.stringify(value, null, 2).replace(/T/g, ' ').substring(1,20)}
    },
    {
        Header: "Timestamp",
        accessor: "timestamp"
    },
    {
        Header: "Station ID",
        accessor: "stationId"
    },
    {
        Header: "Message Type",
        accessor: "msgType"
    },
    {
        Header: "ACARS AppVersionMajor",
        accessor: "acarsAppVersionMajor"
    },
    {
        Header: "ACARS AppVersionMinor",
        accessor: "acarsAppVersionMinor"
    },
    {
        Header: "ACARS AppVersionBuild",
        accessor: "acarsAppVersionBuild"
    },
    {
        Header: "VDLM2 AppVersionMajor",
        accessor: "vdlm2AppVersionMajor"
    },
    {
        Header: "VDLM2 AppVersionMinor",
        accessor: "vdlm2AppVersionMinor"
    },
    {
        Header: "VDLM2 AppVersionBuild",
        accessor: "vdlm2AppVersionBuild"
    },
    {
        Header: "ADSB AppVersionMajor",
        accessor: "adsbAppVersionMajor"
    },
    {
        Header: "ADSB AppVersionMinor",
        accessor: "adsbAppVersionMinor"
    },
    {
        Header: "ADSB AppVersionBuild",
        accessor: "adsbAppVersionBuild"
    },
    {
        Header: "GNSS AppVersionMajor",
        accessor: "gnssAppVersionMajor"
    },
    {
        Header: "GNSS AppVersionMinor",
        accessor: "gnssAppVersionMinor"
    },
    {
        Header: "GNSS AppVersionBuild",
        accessor: "gnssAppVersionBuild"
    },
    {
        Header: "MQTT AppVersionMajor",
        accessor: "mqttAppVersionMajor"
    },
    {
        Header: "MQTT AppVersionMinor",
        accessor: "mqttAppVersionMinor"
    },
    {
        Header: "MQTT AppVersionBuild",
        accessor: "mqttAppVersionBuild"
    },
    {
        Header: "LOCATION AppVersionMajor",
        accessor: "locationAppVersionMajor"
    },
    {
        Header: "LOCATION AppVersionMinor",
        accessor: "locationAppVersionMinor"
    },
    {
        Header: "LOCATION AppVersionBuild",
        accessor: "locationAppVersionBuild"
    },
    {
        Header: "MAIN SYSTEM VersionMajor",
        accessor: "mainSystemVersionMajor"
    },
    {
        Header: "MAIN SYSTEM VersionMinor",
        accessor: "mainSystemVersionMinor"
    },
    {
        Header: "MAIN SYSTEM VersionBuild",
        accessor: "mainSystemVersionBuild"
    },
    {
        Header: "FOTA SERVICE VersionMajor",
        accessor: "fotaServiceVersionMajor"
    },
    {
        Header: "FOTA SERVICE VersionMinor",
        accessor: "fotaServiceVersionMinor"
    },
    {
        Header: "FOTA SERVICE VersionBuild",
        accessor: "fotaServiceVersionBuild"
    },
    {
        Header: "APP IMAGE VersionMajor",
        accessor: "appImageVersionMajor"
    },
    {
        Header: "APP IMAGE VersionMinor",
        accessor: "appImageVersionMinor"
    },
    {
        Header: "APP IMAGE VersionBuild",
        accessor: "appImageVersionBuild"
    },
    {
        Header: "HW REVISION Major",
        accessor: "hwRevisionMajor"
    },
    {
        Header: "HW REVISION Build",
        accessor: "hwRevisionBuild"
    },
    {
        Header: "STATS StartTimestamp",
        accessor: "statsStartTimestamp"
    },
    {
        Header: "STATS EndTimestamp",
        accessor: "statsEndTimestamp"
    },
    {
        Header: "ACARS MsgStats",
        accessor: "acarsMsgStats"
    },
    {
        Header: "VDLM2 MsgStats",
        accessor: "vdlm2MsgStats"
    },
    {
        Header: "ADSB MsgStats",
        accessor: "adsbMsgStats"
    },
    {
        Header: "FRAMES Stats",
        accessor: "framesStats"
    },
    {
        Header: "RAM Usage",
        accessor: "ramUsage"
    },
    {
        Header: "CPU Temp",
        accessor: "cpuTemperature"
    },
    {
        Header: "WiFi Bitrate",
        accessor: "wifiBitrate"
    },
    {
        Header: "WiFi SignalLevel",
        accessor: "wifiSignalLevel"
    },
    {
        Header: "WiFi LinkQuality",
        accessor: "wifiLinkQuality"
    },
    {
        Header: "Latitude",
        accessor: "locationLat"
    },
    {
        Header: "Longitude",
        accessor: "locationLon"
    },
    {
        Header: "Source",
        accessor: "locationSource"
    },
    {
        Header: "Accuracy",
        accessor: "locationAccuracy"
    },
    {
        Header: "Country",
        accessor: "locationCountry"
    },
    {
        Header: "Town",
        accessor: "locationTown"
    }    
]
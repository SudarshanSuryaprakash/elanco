import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from 'react-native-chart-kit';

export default function Quantity({ navigation }) {
  const [totalquantity, setTotalQuantity] = useState(0);
  const [finished, setFinished] = useState(false);
  const [raw, setRaw] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resources, setResources] = useState([]);
  const [logicApps, setLogicApps] = useState([]);
  const [azureAppService, setAzureAppService] = useState([]);
  const [storage, setStorage] = useState([]);
  //const [storage, setStorage] = useState([]);
  const [azureQuantity, setAzureQuantity] = useState(0);
  const [storageQuantity, setstorageQuantity] = useState(0);
  const [logicAppsQuantity, setLogicAppsQuantity] = useState(0);
  const [logicAppsCost, setLogicAppsCost] = useState(0);
  const [storageCost, setstorageCost] = useState(0);
  const [azureCost, setAzureCost] = useState(0);

  const [virtualMachines, setVirtualMachines] = useState([]);
  const [virtualMachinesCost, setVirtualMachinesCost] = useState(0);
  const [virtualMachinesQuantity, setVirtualMachinesQuantity] = useState(0);

  const [virtualMachinesLicenses, setVirtualMachinesLicenses] = useState([]);
  const [
    virtualMachinesLicensesCost,
    setVirtualMachinesLicensesCost,
  ] = useState(0);
  const [
    virtualMachinesLicensesQuantity,
    setVirtualMachinesLicensesQuantity,
  ] = useState(0);

  const [virtualNetwork, setVirtualNetwork] = useState([]);
  const [virtualNetworkCost, setVirtualNetworkCost] = useState(0);
  const [virtualNetworkQuantity, setVirtualNetworkQuantity] = useState(0);

  const [LogAnalytics, setLogAnalytics] = useState([]);
  const [LogAnalyticsCost, setLogAnalyticsCost] = useState(0);
  const [LogAnalyticsQuantity, setLogAnalyticsQuantity] = useState(0);

  const [ATP, setATP] = useState([]);
  const [ATPCost, setATPCost] = useState(0);
  const [ATPQuantity, setATPQuantity] = useState(0);

  const [Bandwidth, setBandwidth] = useState([]);
  const [BandwidthCost, setBandwidthCost] = useState(0);
  const [BandwidthQuantity, setBandwidthQuantity] = useState(0);

  const [KeyVault, setKeyVault] = useState([]);
  const [KeyVaultCost, setKeyVaultCost] = useState(0);
  const [KeyVaultQuantity, setKeyVaultQuantity] = useState(0);

  const [ACD, setACD] = useState([]);
  const [ACDCost, setACDCost] = useState(0);
  const [ACDQuantity, setACDQuantity] = useState(0);

  const [RedisCache, setRedisCache] = useState([]);
  const [RedisCacheCost, setRedisCacheCost] = useState(0);
  const [RedisCacheQuantity, setRedisCacheQuantity] = useState(0);

  const [ContainerRegistry, setContainerRegistry] = useState([]);
  const [ContainerRegistryCost, setContainerRegistryCost] = useState(0);
  const [ContainerRegistryQuantity, setContainerRegistryQuantity] = useState(0);

  const [ADP, setADP] = useState([]);
  const [ADPCost, setADPCost] = useState(0);
  const [ADPQuantity, setADPQuantity] = useState(0);

  const [ADF, setADF] = useState([]);
  const [ADFCost, setADFCost] = useState(0);
  const [ADFQuantity, setADFQuantity] = useState(0);

  const [SecurityCenter, setSecurityCenter] = useState([]);
  const [SecurityCenterCost, setSecurityCenterCost] = useState(0);
  const [SecurityCenterQuantity, setSecurityCenterQuantity] = useState(0);

  const [IA, setIA] = useState([]);
  const [IACost, setIACost] = useState(0);
  const [IAQuantity, setIAQuantity] = useState(0);

  const [ADS, setADS] = useState([]);
  const [ADSCost, setADSCost] = useState(0);
  const [ADSQuantity, setADSQuantity] = useState(0);

  const [ADNS, setADNS] = useState([]);
  const [ADNSCost, setADNSCost] = useState(0);
  const [ADNSQuantity, setADNSQuantity] = useState(0);

  const [AFDS, setAFDS] = useState([]);
  const [AFDSCost, setAFDSCost] = useState(0);
  const [AFDSQuantity, setAFDSQuantity] = useState(0);

  const [NW, setNW] = useState([]);
  const [NWCost, setNWCost] = useState(0);
  const [NWQuantity, setNWQuantity] = useState(0);

  const [ACS, setACS] = useState([]);
  const [ACSCost, setACSCost] = useState(0);
  const [ACSQuantity, setACSQuantity] = useState(0);

  const [APIM, setAPIM] = useState([]);
  const [APIMCost, setAPIMCost] = useState(0);
  const [APIMQuantity, setAPIMQuantity] = useState(0);

  const [PBIE, setPBIE] = useState([]);
  const [PBIECost, setPBIECost] = useState(0);
  const [PBIEQuantity, setPBIEQuantity] = useState(0);
  useEffect(() => {
    //FUNCTION TO FETCH DATA FROM PROVIDED API
    (async () => {
      const res = await fetch(
        'https://engineering-task.elancoapps.com/api/raw'
      );
      const rawTemp = await res.json();

      setRaw(rawTemp);

      const res1 = await fetch(
        'https://engineering-task.elancoapps.com/api/applications'
      );
      const applicationsTemp = await res1.json();
      setApplications(applicationsTemp);
      const res2 = await fetch(
        'https://engineering-task.elancoapps.com/api/resources'
      );
      const resourcesTemp = await res2.json();
      setResources(resourcesTemp);
    })();
    setLogicApps(
      raw.filter((item) => {
        return item.MeterCategory === 'Logic Apps';
      })
    );

    //SETTING INDIVIDUAL RESOURCES
  }, []);

  useEffect(() => {
    if (raw.length !== 0) {
      setResource(setStorage, 'Storage');
      setResource(setLogicApps, 'Logic Apps');
      setResource(setAzureAppService, 'Azure App Service');
      setResource(setVirtualMachines, 'Virtual Machines');
      setResource(setVirtualNetwork, 'Virtual Network');
      setResource(setVirtualMachinesLicenses, 'Virtual Machines Licenses');
      setResource(setLogAnalytics, 'Log Analytics');
      setResource(setATP, 'Advanced Threat Protection');
      setResource(setBandwidth, 'Bandwidth');
      setResource(setKeyVault, 'Key Vault');
      setResource(setACD, 'Azure Cosmos DB');
      setResource(setRedisCache, 'Redis Cache');
      setResource(setContainerRegistry, 'Container Registry');
      setResource(setADP, 'Azure Database for PostgreSQL');
      setResource(setADF, 'Azure Data Factory v2');
      setResource(setSecurityCenter, 'Security Center');
      setResource(setIA, 'Insight and Analytics');
      setResource(setADS, 'Advanced Data Security');
      setResource(setADNS, 'Azure DNS');
      setResource(setAFDS, 'Azure Front Door Service');
      setResource(setNW, 'Network Watcher');
      setResource(setNW, 'Network Watcher');
      setResource(setACS, 'Azure Cognitive Search');
      setResource(setAPIM, 'API Management');
      setResource(setPBIE, 'Power BI Embedded');
    }
  }, [raw]);

  //

  //OBTAINING THE COSTS AND QUANTITIES FROM THE RESOURCES

  useEffect(() => {
    if (logicApps.length !== 0) {
      setCostAndQuantity(logicApps, setLogicAppsCost, setLogicAppsQuantity);
    }

    setCostAndQuantity(storage, setstorageCost, setstorageQuantity);
    setCostAndQuantity(azureAppService, setAzureCost, setAzureQuantity);
    setCostAndQuantity(
      virtualMachines,
      setVirtualMachinesCost,
      setVirtualMachinesQuantity
    );
    setCostAndQuantity(
      virtualNetwork,
      setVirtualNetworkCost,
      setVirtualNetworkQuantity
    );
    setCostAndQuantity(
      virtualMachinesLicenses,
      setVirtualMachinesLicensesCost,
      setVirtualMachinesLicensesQuantity
    );
    setCostAndQuantity(
      LogAnalytics,
      setLogAnalyticsCost,
      setLogAnalyticsQuantity
    );
    setCostAndQuantity(ATP, setATPCost, setATPQuantity);
    setCostAndQuantity(Bandwidth, setBandwidthCost, setBandwidthQuantity);
    setCostAndQuantity(KeyVault, setKeyVaultCost, setKeyVaultQuantity);
    setCostAndQuantity(ACD, setACDCost, setACDQuantity);
    setCostAndQuantity(RedisCache, setRedisCacheCost, setRedisCacheQuantity);
    setCostAndQuantity(
      ContainerRegistry,
      setContainerRegistryCost,
      setContainerRegistryQuantity
    );
    setCostAndQuantity(ADP, setADPCost, setADPQuantity);
    setCostAndQuantity(ADF, setADFCost, setADFQuantity);
    setCostAndQuantity(
      SecurityCenter,
      setSecurityCenterCost,
      setSecurityCenterQuantity
    );
    setCostAndQuantity(IA, setIACost, setIAQuantity);
    setCostAndQuantity(ADS, setADSCost, setADSQuantity);
    setCostAndQuantity(ADNS, setADNSCost, setADNSQuantity);
    setCostAndQuantity(AFDS, setAFDSCost, setAFDSQuantity);
    setCostAndQuantity(NW, setNWCost, setNWQuantity);
    setCostAndQuantity(ACS, setACSCost, setACSQuantity);
    setCostAndQuantity(APIM, setAPIMCost, setAPIMQuantity);
    setCostAndQuantity(PBIE, setPBIECost, setPBIEQuantity);
  }, [
    logicApps,
    azureAppService,
    storage,
    virtualMachines,
    virtualMachinesLicenses,
    virtualNetwork,
    LogAnalytics,
    ATP,
    Bandwidth,
    KeyVault,
    ACD,
    RedisCache,
    ContainerRegistry,
    ADP,
    ADF,
    SecurityCenter,
    IA,
    ADS,
    ADNS,
    AFDS,
    NW,
    ACS,
    APIM,
    PBIE,
  ]);

  const setCostAndQuantity = (resource, setCost, setQuantity) => {
    if (resource.length) {
      let cost = 0;
      let quantity = 0;
      resource.map((item) => {
        quantity = quantity + parseInt(item.ConsumedQuantity);
        cost = cost + parseInt(item.Cost);
      });
      setCost(cost);
      setQuantity(quantity);
    }
  };

  const setResource = (setter, category) => {
    setter(
      raw.filter((item) => {
        return item.MeterCategory === category;
      })
    );
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  const data = {
    labels: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
    ],
    datasets: [
      {
        data: [
          logicAppsQuantity,
          azureQuantity,
          storageQuantity,
          virtualMachinesQuantity,
          virtualMachinesLicensesQuantity,
          virtualNetworkQuantity,
          LogAnalyticsQuantity,
          ATPQuantity,
          BandwidthQuantity,
          KeyVaultQuantity,
          ACDQuantity,
          RedisCacheQuantity,
          ContainerRegistryQuantity,
          ADPQuantity,
          ADFQuantity,
          SecurityCenterQuantity,
          IAQuantity,
          ADSQuantity,
          ADNSQuantity,
          AFDSQuantity,
          NWQuantity,
          ACSQuantity,
          APIMQuantity,
          PBIEQuantity,
        ],
      },
    ],
  };

  let costData = [
    logicAppsCost,
    azureCost,
    storageCost,
    virtualMachinesCost,
    virtualMachinesLicensesCost,
    virtualNetworkCost,
    LogAnalyticsCost,
    ATPCost,
    BandwidthCost,
    KeyVaultCost,
    ACDCost,
    RedisCacheCost,
    ContainerRegistryCost,
    ADPCost,
    ADFCost,
    SecurityCenterCost,
    IACost,
    ADSCost,
    ADNSCost,
    AFDSCost,
    NWCost,
    ACSCost,
    APIMCost,
    PBIECost,
  ];

  let quantityData = [
    logicAppsQuantity,
    azureQuantity,
    storageQuantity,
    virtualMachinesQuantity,
    virtualMachinesLicensesQuantity,
    virtualNetworkQuantity,
    LogAnalyticsQuantity,
    ATPQuantity,
    BandwidthQuantity,
    KeyVaultQuantity,
    ACDQuantity,
    RedisCacheQuantity,
    ContainerRegistryQuantity,
    ADPQuantity,
    ADFQuantity,
    SecurityCenterQuantity,
    IAQuantity,
    ADSQuantity,
    ADNSQuantity,
    AFDSQuantity,
    NWQuantity,
    ACSQuantity,
    APIMQuantity,
    PBIEQuantity,
  ];

  if (quantityData[0] !== 0 && finished === false) {
    let tc = 0;
    quantityData.map((item) => {
      tc = tc + item;
    });
    setTotalQuantity(tc);
    setFinished(true);
  }

  return (
    <View style={styles.container}>
      {logicAppsQuantity !== 0 ? (
        <View>
          <LineChart
            data={data}
            width={screenWidth}
            height={screenHeight / 1.3}
            chartConfig={chartConfig}
            bezier
          />
          <Text style={styles.totalText}>Total Quantity: {totalquantity}</Text>
        </View>
      ) : (
        <ActivityIndicator size='large' color='green' />
      )}

      <TouchableOpacity
        style={styles.legendButton}
        onPress={() =>
          navigation.navigate('Legend', { resources, costData, quantityData })
        }
      >
        <Text style={styles.legendText}>Legend</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgb(10,10,10)',
  },
  legendText: {
    color: 'rgb(26, 255, 146)',
  },
  legendButton: {
    position: 'absolute',
    bottom: 70,
    backgroundColor: 'green',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  totalText: {
    color: 'green',
    position: 'absolute',
    right: 10,
    top: 20,
    fontWeight: 'bold',
    fontSize: 24,
  },
});

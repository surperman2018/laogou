import React,{useState} from "react";
import {View,Text,Image,StyleSheet, FlatList,TouchableHighlight} from "react-native"; 
import { useNavigation } from '@react-navigation/native';

const Loading = ({loaded})=>(
  <View style={styles.loading}>
    <Image 
     style={styles.img}
     source={require('../../../assets/loading.gif')}></Image>
    <Text style={styles.text}>{loaded}</Text>
  </View>
);

const ListHeader = ({text})=>(
  <Text style={{backgroundColor:'#e7f7f3',color:'#5d897e',fontSize:14,padding:10,textAlign:'center'}}>{text}</Text>
);

const JobList = (props) =>{

  const navigation = useNavigation();

  const [isLoad, setisLoad] = useState(false)
  const [loaded, setLoaded] = useState('正在加载中......');

  const loadding = ()=>{
    props.getList({type:'l'});
  };

  const refresh = async ()=>{
    setisLoad(true);
    await props.getList({type:'r'});
    setisLoad(false);
  };

  const toDetail = (data,store)=>{
    store.setCurrJobInfo(data);
    navigation.navigate("Dtail");
  }
  

  const Item = ({data,store})=>(
    <TouchableHighlight
    onPress={toDetail.bind(null,data,store)}>
      <View style={styles.listContainer} key={data.positionId} >
        <Image 
        source={{uri:data.companyLogo}} 
        style={styles.image} />
        <View style={styles.rightBox}>
          <Text style={styles.title}>{data.companyName}</Text>
          <View style={styles.center}>
              <Text style={styles.desc}  numberOfLines={1}>
                {data.positionName} [{data.city}]
              </Text>
              <Text style={styles.price}>{data.salary}</Text>
          </View>
        <Text style={styles.time}>{data.createTime}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );


  return (
    props.showNoting ? 
     !!props.list.length && <FlatList 
      data={props.list}
      refreshing={isLoad} 
      onRefresh={refresh}
      onEndReached={loadding}
      onEndReachedThreshold={0.2}
      ListHeaderComponent={props.headText?<ListHeader text={props.headText} />:null}
      ListFooterComponent={<Loading loaded={loaded}/>}
      renderItem={({item})=><Item data={item} store={props.store}/>}
      />
      : <FlatList 
      data={props.list}
      refreshing={isLoad} 
      onRefresh={refresh}
      onEndReached={loadding}
      onEndReachedThreshold={0.2}
      ListHeaderComponent={props.headText?<ListHeader text={props.headText} />:null}
      ListFooterComponent={<Loading loaded={loaded}/>}
      renderItem={({item})=><Item data={item} store={props.store}/>}
      />
  )
}


export default React.memo(JobList);

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    borderBottomWidth:1,
    borderColor:'#e8e8e8',
    borderStyle:'solid',
    backgroundColor:'#fff' 
  },
  image: {
    height: 60,
    width: 60
  },
  rightBox:{
    paddingLeft:8
  },
  title:{
    fontSize: 15,
    fontWeight:'bold'
  },
  desc:{
    width:'60%',
    fontSize:13
  },
  center:{
    flexDirection:'row',
    justifyContent:"space-between",
    fontSize: 12,
    paddingTop:4,
    paddingBottom:4
  },
  price:{
    color:'#00b38a',
    fontWeight:'bold',
    paddingLeft:10,
    width:'40%',
  },
  time:{
    fontSize:12,
    color:'#888'
  },
  loading:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f6f6f6',
    flexDirection:'row',
  },
  text:{
    fontSize: 16,
    color:'#999'
  },
  img:{
    width:60,
    height:60
  }
});
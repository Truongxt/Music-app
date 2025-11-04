import Header from "@/src/components/common/Header";
import { FeedList } from "@/src/components/feeds/FeedList";
import { colors } from "@/src/constants/tokens";
import { moderateScale } from "@/src/helpers/scales";
import { postSevice } from "@/src/services/postService";
import { defaultStyles } from "@/src/styles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Feed() {
  const [posts, setPosts] = useState<[]>([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      try{
        const postData = await postSevice.getAll();
        setPosts(postData);
      }catch(error){
         console.error("Lỗi khi lấy danh sách tracks:", error);
      }
    };
    fetchPosts();
  },[])

  return (
    <SafeAreaView edges={["top"]} style={defaultStyles.container}>
        <Header leftTitle="Feed" rightSection={<MaterialIcons name="cast-connected" size={moderateScale(22)} color={colors.textMuted}/>}/>
        <FeedList posts={posts}/>
    </SafeAreaView>
  );
}

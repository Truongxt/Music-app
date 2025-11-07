import { SearchBar } from "@/src/components/common/SearchBar";
import { SearchList } from "@/src/components/SearchList";
import { colors, fontSize } from "@/src/constants/tokens";
import { scale, verticalScale } from "@/src/helpers/scales";
import { searchService } from "@/src/services/searchService";
import { defaultStyles } from "@/src/styles";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabItems = [
  { id: 1, title: "All", type: "all" },
  { id: 2, title: "Tracks", type: "track" },
  { id: 3, title: "Albums", type: "album" },
  { id: 4, title: "Artist", type: "artist" },
];

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isActiveTab, setIsActiveTab] = useState<number>(1);
  const handleOnClear = () => setSearchValue("");

  const handleOnClickTab = (idTab: number) => setIsActiveTab(idTab);

  const handleOnSearch = async () => {
    if (!searchValue.trim()) return;
    try {
      const data = await searchService.searchAll(searchValue);
      const formatted = [
        ...data.artists.map((a: any) => ({ ...a, type: "artist" })),
        ...data.albums.map((a: any) => ({ ...a, type: "album" })),
        ...data.musics.map((a: any) => ({ ...a, type: "track" })),
      ];
      setResults(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredResults = useMemo(() => {
    const currentTab = tabItems.find((t) => t.id === isActiveTab);
    if (!currentTab || currentTab.type === "all") return results;
    return results.filter((item) => item.type === currentTab.type);
  }, [isActiveTab, results]);

  return (
    <SafeAreaView edges={["top"]} style={defaultStyles.container}>
      <SearchBar
        onSubmit={handleOnSearch}
        style={{ marginVertical: verticalScale(15) }}
        value={searchValue}
        onChange={setSearchValue}
        onClear={handleOnClear}
      />

      {/* Tabs */}
      <View style={styles.tab}>
        {tabItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handleOnClickTab(item.id)}
            style={[
              styles.tabItem,
              isActiveTab === item.id && {
                borderBottomColor: colors.primary,
                borderBottomWidth: verticalScale(3),
              },
            ]}
          >
            <Text
              style={[
                {
                  fontSize: fontSize.sm,
                  color: colors.textMuted,
                  fontWeight: "500",
                  textAlign: "center",
                },
                isActiveTab === item.id && { color: colors.primary },
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>

      {filteredResults.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: scale(fontSize.sm) }}>No result</Text>
        </View>
      )}

      {filteredResults.length > 0 && (
        <SearchList searchData={filteredResults} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    marginVertical: verticalScale(10),
  },
  tabItem: {
    flex: 1,
    alignContent: "center",
    paddingVertical: verticalScale(10),
  },
});

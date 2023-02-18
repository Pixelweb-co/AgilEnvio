<View style={styles.row}>
                            <Text style={styles.subtitle}>Dark mode</Text>
                            <Switch
                                value={darkmode}
                                onChange={() => setDarkmode(!darkmode)}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.subtitle}>Use device settings</Text>
                            <Switch value={device} onChange={() => setDevice(!device)} />
                        </View>
                        <Text style={styles.description}>
                            Set Dark mode to use the Light or Dark selection located in your
                            device Display and Brightness settings.
                        </Text>
                        <View
                            style={{
                                width: width,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: "gray",
                                marginVertical: 30,
                            }}
                        />
                        <Text style={[styles.title, { width: "100%" }]}>Theme</Text>
                        <Pressable style={styles.row} onPress={() => setTheme("dim")}>
                            <Text style={styles.subtitle}>Dim</Text>
                            {theme === "dim" ? (
                                <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                            ) : (
                                <Entypo name="circle" size={24} color="#56636F" />
                            )}
                        </Pressable>
                        <Pressable style={styles.row} onPress={() => setTheme("lightsOut")}>
                            <Text style={styles.subtitle}>Lights out</Text>
                            {theme === "lightsOut" ? (
                                <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                            ) : (
                                <Entypo name="circle" size={24} color="#56636F" />
                            )}
                        </Pressable>
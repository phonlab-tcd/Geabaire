export default function SwitchEntry({ title, atom }) {
    const [value, setValue] = useRecoilState(atom);

    return (
        <View>
            <Text>{title}</Text>
            <Switch
                trackColor={{
                    false: "#767577",
                    true: "#81b0ff",
                }}
                thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setValue}
                value={value}
            />
        </View>
    );
}

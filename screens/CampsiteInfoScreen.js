import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite'
import { COMMENTS } from '../shared/comments';



const CampsiteInfoScreen = ({ route }) => {
    // route prop
    const { campsite } = route.params;
    // state variable and setting function with the useState hook being passed comments
    const [comments, setComments] = useState(COMMENTS);
    // render comment variable - destructures an item in the param list and returns text in a view
    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    // using flatlist to render comments
    return (
        <FlatList
            //data prop
            data={comments.filter(
                //return comments whose id's match campsite id
                (comment) => comment.campsiteId === campsite.id
            )}
            //render item prop set equal to render comment item variable
            renderItem={renderCommentItem}
            //key extractor prop since all items have a unique key, the extracor prop can be used to get the key
            keyExtractor={(item) => item.id.toString()}
            // content container prop to add to flatlist rendering
            contentContainerStyle={{
                marginHorizontal: 20,
                paddingVertical: 20
            }}
            ListHeaderComponent={
                <>
                    <RenderCampsite
                        campsite={campsite}
                    />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    }
});

export default CampsiteInfoScreen;

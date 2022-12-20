import { FlatList, StyleSheet, Text, View, Button, Modal, TextInput, SafeAreaView } from 'react-native';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Rating, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { postComment } from '../features/comments/commentsSlice';
import { commentsReducer } from '../features/comments/commentsSlice';





const CampsiteInfoScreen = ({ route }) => {
    // route prop
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');



    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        }
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    }

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };

    // render comment variable - destructures an item in the param list and returns text in a view
    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    startingValue={rating}
                    imageSize={10}
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                    readonly
                />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    // using flatlist to render comments
    return (
        <>
            <FlatList
                //data prop
                data={comments.commentsArray.filter(
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
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.Modal}>
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'user-o'
                        }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={author => setAuthor(author)}
                        value={author}

                    />
                    <Input
                        placeholder='Comment'
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'comment-o'
                        }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={text => setText(text)}
                        value={text}

                    />
                    <View style={{ margin: 10 }}>
                        <Button
                            title='Submit'
                            color='#5637DD'
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                        />

                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                </View>
            </Modal>
        </>
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
    },
    Modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;


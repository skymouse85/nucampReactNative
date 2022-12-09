import { useState } from "react";
import { CAMPSITES } from "../shared/campsites";
import { DirectoryScreen } from './DirectoryScreen';


export const Main = () => {
    const [campsites, setCampsites] = useState(CAMPSITES);

    return <DirectoryScreen campsites={campsites} />;
};

import React from "react";


// Styled Components
import { HashtagCloud } from "../../styled/posts/hashtagCloud";

export default function HashtagCloudComponent({hashtags}) {
    return (
        <HashtagCloud>
                <p>{hashtags && hashtags.map(hashtag => hashtag.startsWith('#') ? `${hashtag} ` : `#${hashtag} `)}</p>
        </HashtagCloud>
    );
    }
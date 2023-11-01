import React from "react";


// Styled Components
import { FiveList } from "../../styled/posts/fiveList";

export default function FiveListComponent({list}) {
    return (
        <FiveList>
          <ol>
                <li>{list && list[0] && list[0].place1}</li>
                <li>{list && list[0] && list[1].place2}</li>
                <li>{list && list[0] && list[2].place3}</li>
                <li>{list && list[0] && list[3].place4}</li>
                <li>{list && list[0] && list[4].place5}</li>
            </ol>
        </FiveList>
    );
    }
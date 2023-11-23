import styled from 'styled-components';

export const ProfileInfo = styled.div`
    margin-bottom: 15px;
    color: #fff;
    display: flex;
    gap: 18px;

    .userInfo{
        display: flex;
        flex-direction: column;
        gap: 7px;
    }

    .socialMediaIcons {
        display: flex;
        gap: 12px;
    }

    .profileavatar {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 15px;
    }
    `;
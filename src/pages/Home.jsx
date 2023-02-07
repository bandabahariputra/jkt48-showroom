import { useEffect, useState } from 'react';
import axios from 'axios';
import { allMembersApi, getUserApi } from '../utils/api';
import useFetch from '../hooks/useFetch';
import Title from '../components/Title';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

const Home = () => {
  const [members, setMembers] = useState(null);
  const [academyMembers, setAcademyMembers] = useState(null);

  const academyMemberIds = [
    {
      id: '400710',
      name: 'amanda',
    },
    {
      id: '400712',
      name: 'giselle',
    },
    {
      id: '400713',
      name: 'lia',
    },
    {
      id: '400714',
      name: 'callie',
    },
    {
      id: '400715',
      name: 'ela',
    },
    {
      id: '400716',
      name: 'indira',
    },
    {
      id: '400717',
      name: 'lyn',
    },
    {
      id: '400718',
      name: 'raisha',
    },
  ];

  const { data: regularMembers } = useFetch(allMembersApi);

  useEffect(() => {
    const graduatedMembers = [];

    if (regularMembers) {
      const jkt48Members = regularMembers
        .filter(
          (item) => item.name.includes('JKT48')
            && !graduatedMembers.includes(item.url_key),
        )
        .sort((a, b) => b.follower_num - a.follower_num);

      setMembers(jkt48Members);
    }
  }, [regularMembers]);

  useEffect(() => {
    // academy members
    const getAcademyMembers = async () => {
      const acms = await Promise.all(academyMemberIds.map(async (academy) => {
        const { data: acm } = await axios.get(getUserApi(academy.id));

        return acm;
      }));

      setAcademyMembers(acms.map((item) => ({
        description: item.description,
        follower_num: item.follower_num,
        id: item.room_id,
        image_url: item.image,
        is_live: item.is_onlive,
        is_party: item.party_live_status === 1,
        name: item.room_name,
        next_live_scheduled: null,
        url_key: item.room_url_key,
      })));
    };

    getAcademyMembers();
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      {members ? (
        <div>
          <Title text="Regular" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {members.map((member) => (
              <Card key={member.id} data={member} to={`/room/${member.id}`} />
            ))}
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
      {academyMembers ? (
        <div>
          <Title text="Academy" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {academyMembers.map((member) => (
              <Card key={member.id} data={member} to={`/room/${member.id}`} />
            ))}
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Home;

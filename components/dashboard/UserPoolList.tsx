import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Address, usePublicClient } from "wagmi";
import { useNetworkName } from "#/hooks/useNetworkName";
import { FrensContracts } from "#/utils/contracts";
import { PoolType } from "#/types/commonTypes";
import PoolCard from "./PoolCard";

interface UserPoolList {
  operatorAddress: Address;
}

const buildQuery = ({ operatorAddress }: { operatorAddress: string }) => {
  const query = `
  {
    creates(where: {creator: "${operatorAddress}"}) {
      deposits {
        amount
      }
      contractAddress
      creator
    }
  }
  `;
  return query;
};

export const UserPoolList = ({ operatorAddress }: UserPoolList) => {
  const userPoolsQuery = buildQuery({ operatorAddress });
  const { loading, error, data: userPools } = useQuery(gql(userPoolsQuery));
  const network = useNetworkName();

  const poolCreates = userPools?.creates;
  const [poolStates, setPoolStates] = useState<any[]>([]);
  const [registerThesePools, setRegisterThesePools] = useState<PoolType[]>([]);
  const [openPools, setOpenPools] = useState<PoolType[]>([]);
  const [stakedPools, setStakedPools] = useState<PoolType[]>([]);

  const publicClient = usePublicClient();

  useEffect(() => {
    if (poolCreates) {
      setPoolStatesArray();
    }
  }, [poolCreates]);

  useEffect(() => {
    {
      poolStates?.map((pool: PoolType) => {
        const poolBalance = pool.deposits?.reduce(
          (acc, current) => acc + parseInt(current.amount, 10),
          0
        );
        if (
          poolBalance === 32000000000000000000 &&
          pool.poolState === "accepting deposits"
        ) {
          setRegisterThesePools([...registerThesePools, pool]);
        }
        if (
          poolBalance !== 32000000000000000000 &&
          pool.poolState === "accepting deposits"
        ) {
          setOpenPools([...openPools, pool]);
        }
        if (pool.poolState === "staked") {
          setStakedPools([...stakedPools, pool]);
        }
      });
    }
  }, [poolStates]);

  const setPoolStatesArray = async () => {
    const statesOfPools = await Promise.all(
      poolCreates.map(async (pool: PoolType) => await getStateOfPool(pool))
    );
    setPoolStates(statesOfPools);
  };

  const getStateOfPool = async (pool: PoolType) => {
    const poolState = (await publicClient.readContract({
      address: pool.contractAddress,
      abi: FrensContracts[network].StakingPool.abi,
      functionName: "getState",
    })) as string;

    return { ...pool, poolState };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-frens-main"></span>
      </div>
    );
  }

  return (
    <div>
      {registerThesePools.length > 0 && (
        <div>
          <div className="mb-2 text-base font-semibold leading-7 text-gray-900">
            Take action. You can run this validator
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {registerThesePools?.map((pool: PoolType) => (
              <PoolCard pool={pool} key={pool.contractAddress} />
            ))}
          </div>
        </div>
      )}

      {openPools.length > 0 && (
        <div>
          <div className="mb-2 text-base font-semibold leading-7 text-gray-900">
            Still collecting
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {openPools?.map((pool: PoolType) => (
              <PoolCard pool={pool} key={pool.contractAddress} />
            ))}
          </div>
        </div>
      )}

      {stakedPools.length > 0 && (
        <div>
          <div className="mb-2 text-base font-semibold leading-7 text-gray-900">
            Up and running
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stakedPools?.map((pool: PoolType) => (
              <PoolCard pool={pool} key={pool.contractAddress} />
            ))}
          </div>
        </div>
      )}

      {poolStates.length === 0 && <div>No pools yet</div>}
    </div>
  );
};

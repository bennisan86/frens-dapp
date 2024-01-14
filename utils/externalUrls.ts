import { Address, Chain } from "wagmi";

export function subgraphUrl(chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://api.studio.thegraph.com/query/46611/frens-goerli/version/latest`;
    case 17000:
      return `https://api.studio.thegraph.com/query/46611/frens-holesky/version/latest`;
    default:
      return `https://api.studio.thegraph.com/query/46611/frens-goerli/version/latest`;
  }
}

export function etherscanUrl(chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://goerli.etherscan.io`;
    case 17000:
      return `https://holesky.etherscan.io`;
    default:
      return `https://etherscan.io`;
  }
}

export function beaconchainUrl(chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://goerli.beaconcha.in`;
    case 17000:
      return `https://holesky.beaconcha.in`;
    default:
      return `https://beaconcha.in`;
  }
}

export function openseaUrl(poolAddress: Address, nftID: string, chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://testnets.opensea.io/assets/goerli/${poolAddress}/${nftID}`;
    case 17000:
      return `https://testnets.opensea.io/assets/holesky/${poolAddress}/${nftID}`;
    default:
      return `https://opensea.io/assets/${poolAddress}/${nftID}`;
  }
}

export function ssvExplorer(publicKey: string, chain?: Chain) {
  // remove `0x` prefix
  const publicKeyWithout0xPrefix = publicKey.replace(/^(0x)/, "");

  switch (chain?.id) {
    case 5:
      return `https://goerli.explorer.ssv.network/validators/${publicKeyWithout0xPrefix}`;
    case 17000:
      return `https://holesky.explorer.ssv.network/validators/${publicKeyWithout0xPrefix}`;
    default:
      return `https://explorer.ssv.network/validators/${publicKeyWithout0xPrefix}`;
  }
}

export function ssvOperatorListApi(
  page: number,
  perPage: number,
  chain?: Chain
) {
  switch (chain?.id) {
    case 5:
      return `https://api.ssv.network/api/v4/prater/operators?page=${page}&perPage=${perPage}&ordering=performance.24h%3Adesc`;
    case 17000:
      return `https://api.ssv.network/api/v4/holesky/operators?page=${page}&perPage=${perPage}&ordering=performance.24h%3Adesc`;
    default:
      return `https://api.ssv.network/api/v4/mainnet/operators?page=${page}&perPage=${perPage}&ordering=performance.24h%3Adesc`;
  }
}

export function ssvOperatorApi(
  page: number,
  perPage: number,
  name: string,
  chain?: Chain
) {
  switch (chain?.id) {
    case 5:
      return `https://api.ssv.network/api/v4/prater/operators?page=${page}&perPage=${perPage}&search=${name}`;
    case 17000:
      return `https://api.ssv.network/api/v4/holesky/operators?page=${page}&perPage=${perPage}&${name}`;
    default:
      return `https://api.ssv.network/api/v4/mainnet/operators?page=${page}&perPage=${perPage}&${name}`;
  }
}

export function ssvValidatorApi(publicKey: string, chain?: Chain) {
  switch (chain?.id) {
    case 5:
      return `https://api.ssv.network/api/v4/prater/validators/${publicKey}`;
    case 17000:
      return `https://api.ssv.network/api/v4/holesky/validators/${publicKey}`;
    default:
      return `https://api.ssv.network/api/v4/mainnet/validators/${publicKey}`;
  }
}

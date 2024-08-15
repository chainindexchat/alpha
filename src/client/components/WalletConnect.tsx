import * as React from "react";
import { useMemo } from "react";
import { AddLink } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Box, Tooltip } from "@mui/material";
import { capitalize } from "lodash";
import CustomImage from "./CustomImage";
import { useRewardAddress, useWallet, useWalletList } from "@meshsdk/react";
import LogoutIcon from "@mui/icons-material/Logout";
import WarningIcon from "@mui/icons-material/Warning";
import {
  useGetPingQuery,
  useLazyGetPingQuery,
  usePostLoginMutation,
  usePostUserMutation,
} from "../store/chainindexApi";

const MENU_WIDTH = "170px";
export default function WalletConnect() {
  const walletList = useWalletList();
  const rewardAddress = useRewardAddress();
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
  const [authError, setAuthError] = React.useState<null | Error>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [authenticating, setIsAuthenticating] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const { data: pingData, error: pingError } = useGetPingQuery();
  React.useEffect(() => {
    if (!pingData || pingError) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [pingData, pingError]);

  const open = Boolean(anchorEl);
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
    if (authError) setAuthError(null);
  }, [authError]);
  const [postUser, { isLoading: postUserIsLoading }] = usePostUserMutation();
  const [postLogin, { isLoading: postLoginIsLoading }] = usePostLoginMutation();
  const [trigger] = useLazyGetPingQuery();

  const selectWallet = React.useCallback(
    (walletName: string) =>
      async <T extends HTMLElement>(event: React.MouseEvent<T>) => {
        event.preventDefault();
        event.stopPropagation();
        handleClose();
        await connect(walletName);
      },
    [connect],
  );
  React.useEffect(() => {
    if (connected && wallet && rewardAddress && !isAuthenticated) {
      const login = async () => {
        try {
          setAuthError(null);
          setIsAuthenticating(true);
          // const { walletInstance } = wallet;
          // const stakeCredential = (
          //   await walletInstance.getRewardAddresses()
          // )[0];
          // if (!stakeCredential)
          //   throw new Error('missing wallet stake credential');
          const { data: dataUser, error: errorUser } = await postUser({
            rewardAddress,
          });
          if (!dataUser || errorUser)
            throw new Error("failed to register user with rewardAddress");
          // const { nonce } = dataUser;
          // const signed = await walletInstance.signData(stakeCredential, nonce);
          const signed = {
            rewardAddress: "abc",
            signature: "123",
            key: "456",
          };
          const { data: dataLogin, error: errorLogin } = await postLogin({
            ...signed,
            rewardAddress,
          });
          if (!dataLogin || errorLogin) {
            throw new Error("failed to validate stake credential");
          }

          setIsAuthenticated(true);
        } catch (e) {
          console.log(e);
          setAuthError(e as unknown as any);
        }
        setIsAuthenticating(false);
        trigger();
      };
      login();
    }
  }, [connected, wallet, rewardAddress, isAuthenticated]);

  const disconnectWallet = React.useCallback(
    async <T extends HTMLElement>(event: React.MouseEvent<T>) => {
      event.preventDefault();
      event.stopPropagation();

      disconnect();
    },
    [],
  );

  const hasError = useMemo(() => error || authError, [error, authError]);
  const disabled = useMemo(
    () => !(walletList?.length > 0 || !isAuthenticated),
    [walletList, isAuthenticated],
  );
  const loading = useMemo(() => {
    return (
      connecting || postUserIsLoading || postLoginIsLoading || authenticating
    );
  }, [connecting, postUserIsLoading, postLoginIsLoading, authenticating]);
  const { buttonText, buttonIcon, buttonColor } = useMemo(() => {
    if (hasError) {
      return {
        buttonText: "Error!",
        buttonIcon: <WarningIcon />,
        buttonColor: "error",
      };
    } else if (connected) {
      return {
        buttonText: name,
        buttonIcon: (
          <CustomImage
            src={`/img/${capitalize(wallet._walletName)}.png`}
            width={20}
            height={20}
            alt="Nami"
          />
        ),
        buttonColor: "primary",
      };
    } else if (loading) {
      return {
        buttonText: "Connecting",
        buttonIcon: <AddLink />,
        buttonColor: "primary",
      };
    } else {
      return {
        buttonText: "Connect",
        buttonIcon: <AddLink />,
        buttonColor: "primary",
      };
    }
  }, [wallet, connected, loading, name, hasError]);

  return (
    <Tooltip
      title="No available wallets detected"
      placement="bottom"
      disableHoverListener={!disabled}
      open={disabled}
    >
      <div>
        <LoadingButton
          size="small"
          variant="contained"
          sx={{
            marginLeft: 2,
            marginRight: 0,
            position: "relative",
            minWidth: `${MENU_WIDTH}`,
          }}
          color={`${buttonColor}` as any}
          loading={loading}
          disabled={disabled}
          onClick={handleClick}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <span className="pl-1">{buttonIcon}</span>
          <span className="pl-4">{buttonText}</span>
          <Box sx={{ flexGrow: 1 }} />
        </LoadingButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
            disablePadding: true,
            sx: { backgroundColor: "#404040" },
          }}
          sx={{ padding: 0 }}
        >
          <MenuList dense sx={{ padding: 0, minWidth: `${MENU_WIDTH}` }}>
            {!connected &&
              !loading &&
              walletList.map((wallet, index) => (
                <MenuItem key={index} onClick={selectWallet(wallet.name)}>
                  <ListItemIcon>
                    <CustomImage
                      src={`/img/${capitalize(wallet.name)}.png`}
                      width={20}
                      height={20}
                      alt="Nami"
                    />
                  </ListItemIcon>
                  <ListItemText>{capitalize(wallet.name)}</ListItemText>
                  <Box sx={{ flexGrow: 1 }} />
                </MenuItem>
              ))}
            {connected && !loading && (
              <div>
                <MenuItem onClick={disconnectWallet}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>Disconnect</ListItemText>
                  <Box sx={{ flexGrow: 1 }} />
                </MenuItem>
              </div>
            )}
          </MenuList>
        </Menu>
      </div>
    </Tooltip>
  );
}

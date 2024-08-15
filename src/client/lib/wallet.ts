export function getUtxoWithMostLovelace(utxos) {
    return utxos.reduce((acc, utxo) => {
        if (!acc) return utxo;
        const [newLovelace] = utxo.output.amount.filter(
            (value) => value.unit === 'lovelace'
        );
        const [oldLovelace] = acc.output.amount.filter(
            (value) => value.unit === 'lovelace'
        );
        if (parseInt(newLovelace.quantity) > parseInt(oldLovelace.quantity)) {
            return utxo;
        } else {
            return acc;
        }
    }, null);
}
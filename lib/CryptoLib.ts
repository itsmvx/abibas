import crypto from 'crypto';

const cryptoSecret: string = '$2a$10$FhrJs/sxuxoaOPEaisSU9O0RMEUctF1T3BzTHXts.17AdAHZxFT0q';
const MariSecret: string = 'Meng kecil';
const NoaSecret: string = 'Noa Sayang';
const getAesKey = (): string => {
    return crypto.createHash('sha256').update(cryptoSecret || '').digest('hex');
};
type AesEncryptType = {
    key: string | null,
    iv: Buffer | null
}
export const aesEncrypt = (text?: string, iv?:Buffer): AesEncryptType => {
    try {
        const plainText: string = text ?? crypto.randomBytes(16).toString('utf-8');
        const initialVector: Buffer = iv ?? crypto.randomBytes(16);
        const cipher: crypto.Cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(getAesKey(), 'hex'), initialVector);
        let encrypted: string = cipher.update(plainText, 'utf-8', 'hex');
        encrypted += cipher.final('hex');

       return {
           key: encrypted,
           iv: iv ?? initialVector
       };
    } catch (error) {
        return {
            key: null,
            iv: null
        };
    }
};
export const aesDecrypt = (value: string, iv: Buffer): string | null => {
    try {
        const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(getAesKey(), 'hex'), iv);
        let decrypted: string = decipher.update(value, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    } catch (error) {
        return null;
    }
};
export const aesCryptoTest = (key: string, iv: Buffer, type: 'API' | 'WEB'): boolean => {
    try {
        const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(getAesKey(), 'hex'), iv);
        let decrypted: string = decipher.update(key, 'hex', 'utf-8');

        switch (type) {
            case "API":
                return MariSecret === decrypted;
            case "WEB":
                return decrypted.includes(NoaSecret);
            default:
                return false;
        }
    } catch (error) {
        return false;
    }
};

export const getWebKey = (): { key: string | null, iv: string | null }  => {
    const randomString: string = crypto.randomBytes(24).toString('hex');
    const NoaUltimateSecret: string = randomString.concat(NoaSecret);
    const { key, iv }: AesEncryptType = aesEncrypt(NoaUltimateSecret, Buffer.from('FL6/s1h5cc6kZ63KAwVjkA==', 'base64'));
    return {
        key: key,
        iv: iv ? iv.toString('base64') : null
    };
};

export const checkWebKey = (paramKey: string): boolean => {
    return aesCryptoTest(paramKey, Buffer.from('FL6/s1h5cc6kZ63KAwVjkA==', 'base64'), 'WEB');
};

export const getApiKey = (): { key: string | null, iv: string | null } => {
    const { key, iv }: AesEncryptType = aesEncrypt(MariSecret);
    return {
        key: key,
        iv: iv ? iv.toString('base64') : null
    };
};
export const checkApiKey = async (headerKey: string): Promise<{ ok: boolean, message: string }> => {
    try {
        const { iv, key } = JSON.parse(headerKey);
        if (!iv || !key ) {
            throw new Error('Invalid API KEY man..');
        }
        if (!aesCryptoTest(key, Buffer.from(iv, 'base64'), 'API')) {
            throw new Error('Wrong API KEY man.. Ganbare ganbare :D');
        }
        return {
            ok: true,
            message: 'Match API KEY'
        };
    } catch (error: any) {
        return {
            ok: false,
            message: 'Nice Try man..'
        };
    }
};

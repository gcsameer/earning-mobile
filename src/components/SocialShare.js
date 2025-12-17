import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Alert,
  Linking,
} from 'react-native';

export default function SocialShare({ type = 'referral', referralLink = '' }) {
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    if (!referralLink) {
      Alert.alert('Error', 'Referral link not available');
      return;
    }

    try {
      setSharing(true);
      const result = await Share.share({
        message: `Join NepEarn and start earning money! Use my referral code: ${referralLink}`,
        title: 'Join NepEarn',
      });

      if (result.action === Share.sharedAction) {
        Alert.alert('Shared!', 'Thank you for sharing!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
    } finally {
      setSharing(false);
    }
  };

  const openSocialMedia = (platform) => {
    const message = `Join NepEarn and start earning money! Use my referral code: ${referralLink}`;
    let url = '';

    switch (platform) {
      case 'whatsapp':
        url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      case 'telegram':
        url = `tg://msg?text=${encodeURIComponent(message)}`;
        break;
      default:
        return;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', `${platform} is not installed`);
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to open app');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share via</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.shareButton, styles.whatsappButton]}
          onPress={() => openSocialMedia('whatsapp')}
        >
          <Text style={styles.shareButtonText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.shareButton, styles.facebookButton]}
          onPress={() => openSocialMedia('facebook')}
        >
          <Text style={styles.shareButtonText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.shareButton, styles.twitterButton]}
          onPress={() => openSocialMedia('twitter')}
        >
          <Text style={styles.shareButtonText}>Twitter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.shareButton, styles.telegramButton]}
          onPress={() => openSocialMedia('telegram')}
        >
          <Text style={styles.shareButtonText}>Telegram</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.shareButton, styles.genericButton]}
        onPress={handleShare}
        disabled={sharing}
      >
        <Text style={styles.shareButtonText}>
          {sharing ? 'Sharing...' : 'Share via...'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  shareButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
  },
  telegramButton: {
    backgroundColor: '#0088cc',
  },
  genericButton: {
    backgroundColor: '#10b981',
    width: '100%',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});


package com.partypeople.backend.domain.wishlist;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.account.UserRepository;
import com.partypeople.backend.domain.global.Exception.PartyNotFoundException;
import com.partypeople.backend.domain.global.Exception.UserNotFoundException;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class WishlistService {
    private final UserRepository userRepository;
    private final PartyRepository partyRepository;


    // 위시리스트에 파티 추가
    @Transactional
    public void addPartyToWishlist(Long userId, Long partyId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found with ID: " + partyId));

        user.getWishlist().add(party);
        party.getUsers().add(user);
    }

    // 위시리스트 조회
    public List<Party> getWishlist(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        return user.getWishlist();
    }

    // 위시리스트에서 파티 제거
    @Transactional
    public void removePartyFromWishlist(Long userId, Long partyId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found with ID: " + partyId));

        user.getWishlist().remove(party);
        party.getUsers().remove(user);
    }
}
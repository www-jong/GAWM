package com.cute.gawm.domain.user.entity;


import com.cute.gawm.domain.user.dto.UserEditForm;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    @Column
    private String email;
    @Column
    private int age;
    @Enumerated(EnumType.STRING)
    @Column
    private Gender gender;
    @Column
    private String nickname;
    @Enumerated(EnumType.STRING)
    @Column
    private Role role;
    @Builder.Default
    @Column
    private int point = 0;
    @Builder.Default
    @Column
    private int level = 1;
    @Column
    private String session;
    @Column(name = "profile_img")
    private String profileImg;
    @Column(name = "provider")
    private Provider provider;

    public enum Gender {
        MALE, FEMALE, NONE
    }

    public enum Provider {
        GOOGLE, KAKAO
    }

    public User update(String email) {
        this.email = email;
        return this;
    }

    public void update(UserEditForm form) {
        this.nickname = form.getNickname();
        this.gender = form.getGender();
        this.age = form.getAge();
    }

    public void updateProfileImge(String profileImg) {
        this.profileImg = profileImg;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }

    public void addPoint(Integer point){
        this.point+=point;
        levelUp();
    }

    public void levelUp(){
        if (this.level < 4) {
            int[] levelThresholds = {100, 150, 200}; // 각 레벨의 필요한 포인트
            for (int i = this.level - 1; i < levelThresholds.length; i++) {
                if (this.point >= levelThresholds[i]) {
                    this.point -= levelThresholds[i];
                    this.level++;
                } else {
                    break; // 포인트가 필요한 레벨보다 적으면 더 이상 레벨 업은 할 수 없음
                }
            }
        }
    }

    public void minusPoint(Integer point){
        this.point-=point;
        levelDown();
    }

    public void levelDown(){
        if (this.level > 1) { // 레벨이 1 이상인 경우에만 레벨 다운 가능
            int[] levelThresholds = {100, 150, 200}; // 각 레벨의 필요한 포인트
            for (int i = this.level - 1; i > 0; i--) {
                if (this.point < 0) {
                    this.level--;
                    if (this.level >= 1) {
                        this.point += levelThresholds[this.level - 1];
                    }
                } else {
                    break; // 포인트가 필요한 레벨보다 적으면 더 이상 레벨 다운은 할 수 없음
                }
            }
        }
    }
}

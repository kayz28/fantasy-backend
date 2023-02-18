create table dream11.d11_contest_ranks
(
    id         int    null,
    rank_start int    null,
    rank_end   bigint null,
    contest_id int    null
);

create table dream11.d11_contests_dynamic_rules
(
    id                     int null,
    contest_id             int null,
    contest_size           int null,
    allowed_teams          int null,
    user_max_teams         int null,
    contest_winning_amount int null
);

create table dream11.d11_cricket_user_teams
(
    id                int auto_increment
        primary key,
    user_id           bigint           not null,
    p1_id             int              not null,
    p2_id             int              not null,
    p3_id             int              not null,
    p4_id             int              not null,
    p5_id             int              not null,
    p6_id             int              not null,
    p7_id             int              not null,
    p8_id             int              not null,
    p9_id             int              not null,
    p10_id            int              not null,
    p11_id            int              not null,
    points            double default 0 null,
    contest_id        int              null,
    winner            tinyint(1)       null,
    `rank`            bigint           null,
    credits_used      double           null,
    credits_remaining double           null,
    total_credits     double           null
);

create index d11_cricket_user_teams_user_id_contest_id_index
    on dream11.d11_cricket_user_teams (user_id, contest_id);

create table dream11.d11_game_categories_info
(
    id                    int                                 not null
        primary key,
    game_name             varchar(20)                         null comment 'game name',
    player_sub_categories varchar(100)                        null,
    contest_players       smallint                            not null comment 'total players in one contest',
    dream_team_players    smallint                            null,
    created_at            timestamp                           null,
    updated_at            timestamp default CURRENT_TIMESTAMP null
);

create table dream11.d11_game_rules
(
    id      int auto_increment
        primary key,
    game_id int null,
    rules   int null,
    points  int null
);

create table dream11.d11_leagues_info
(
    id                      bigint auto_increment
        primary key,
    league_name             varchar(50)                            not null comment 'name of the league',
    league_matches          int                                    null comment 'number of matches in a league',
    league_start_date       date                                   not null comment 'start date of the league',
    league_end_date         date                                   not null comment 'end date of league',
    league_duration_in_days int                                    null comment 'duration of the league',
    league_venue            varchar(50)                            not null comment 'venue of the league',
    league_rating           int       default 0                    null comment 'rating of league out of 10',
    league_category         enum ('soccer', 'cricket', 'football') not null comment 'category of the league',
    league_number_of_teams  int                                    null comment 'number of teams in the league',
    created_at              timestamp default CURRENT_TIMESTAMP    null,
    updated_at              timestamp default CURRENT_TIMESTAMP    null on update CURRENT_TIMESTAMP
)
    comment 'leagues related data';

create table dream11.d11_contests_info
(
    id                      bigint auto_increment
        primary key,
    contest_name            varchar(50)                            not null comment 'name of the contest ( T1 VS T2 )',
    contest_num_of_players  smallint                               null comment 'number of players',
    contest_entry_fee       int                                    not null,
    contest_datetime        datetime                               not null comment 'contest play datetime',
    contest_category        enum ('soccer', 'cricket', 'football') not null,
    contest_team1_name      varchar(50)                            not null comment 'team one name',
    contest_team2_name      varchar(50)                            not null comment 'team2 name',
    contest_is_roundlocked  tinyint(1) default 0                   null,
    contest_duration_in_hrs smallint                               null,
    created_at              timestamp  default CURRENT_TIMESTAMP   null,
    updated_at              timestamp  default CURRENT_TIMESTAMP   null on update CURRENT_TIMESTAMP,
    league_id               bigint                                 not null comment 'fkey to league table',
    constraint d11_contests_d11_leagues_id_fk
        foreign key (league_id) references dream11.d11_leagues_info (id)
)
    comment 'data of the contests in a league';

create index d11_leagues_league_category_index
    on dream11.d11_leagues_info (league_category);

create table dream11.d11_players_info
(
    id                              bigint                               not null
        primary key,
    league_total_points_so_far      int                                  null,
    team_name                       varchar(50)                          not null,
    team_id                         int                                  not null,
    player_name                     varchar(100)                         not null,
    player_rating_in_current_league int                                  not null,
    player_jersey_number            int                                  not null,
    contest_id                      bigint                               not null,
    in_playing_11                   tinyint(1) default 0                 null,
    playing_department              varchar(50)                          null,
    player_id                       int                                  null,
    is_fit                          tinyint(1)                           null,
    in_dream_team                   tinyint(1) default 0                 null,
    created_at                      timestamp  default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    updated_at                      timestamp  default CURRENT_TIMESTAMP null,
    player_sub_category             varchar(50)                          null,
    previous_player_id              int        default -1                null comment 'to track perevious contest score from the  id of the player',
    age                             int                                  null,
    contest_points                  int        default 0                 null,
    constraint d11_players_info_d11_contests_id_fk
        foreign key (contest_id) references dream11.d11_contests_info (id),
    constraint age_check
        check (`age` >= 18)
);

create table dream11.d11_teams_info
(
    id            bigint                                 not null
        primary key,
    team_name     varchar(50)                            not null,
    team_country  varchar(50)                            not null,
    team_category enum ('soccer', 'cricket', 'football') not null,
    created_at    timestamp                              not null on update CURRENT_TIMESTAMP,
    updated_at    timestamp                              null on update CURRENT_TIMESTAMP
);

create table dream11.d11_user_info
(
    id                          bigint auto_increment
        primary key,
    first_name                  varchar(50)                          not null,
    last_name                   varchar(50)                          not null,
    email_id                    varchar(50)                          not null,
    phone_number                mediumtext                           not null,
    is_verified                 tinyint(1) default 0                 null,
    is_staff                    tinyint(1)                           null,
    came_from_referral          tinyint(1)                           null,
    pan_number                  varchar(20)                          not null,
    dream11_username            varchar(50)                          not null,
    user_last_active            timestamp  default CURRENT_TIMESTAMP not null,
    dream11_password            varchar(20)                          not null,
    balance                     double     default 0                 null,
    contest_joined              int        default 0                 null,
    contest_won                 int        default 0                 null,
    user_points                 double     default 0                 null,
    universal_identification_id varchar(50)                          not null comment 'hash of pan_number, phone_number, first name and last name',
    is_signed_in                tinyint(1) default 0                 null,
    created_at                  timestamp  default CURRENT_TIMESTAMP not null,
    updated_at                  timestamp  default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
)
    comment 'user registeration information';

create table dream11.d11_user_transaction
(
    id                   bigint     null,
    user_id              int        null,
    previous_balance     double     null,
    current_balance      double     null,
    amount_transacted    double     null,
    created_at           timestamp  null,
    updated_at           timestamp  null on update CURRENT_TIMESTAMP,
    reward               double     null,
    used_in_contest      tinyint(1) null,
    contest_id           int        null,
    credited_to_dream11  tinyint(1) null,
    debited_from_dream11 double     null
);

